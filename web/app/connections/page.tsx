"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/layout/Navbar";

type Profile = {
    id: string;
    first_name: string | null;
    last_name: string | null;
    company: string | null;
    job_title: string | null;
};

type ConnectionRow = {
    id: string;
    requester_id: string;
    recipient_id: string;
    status: string;
};

type ConnectionItem = ConnectionRow & {
    requesterProfile?: Profile | null;
    recipientProfile?: Profile | null;
};

export default function ConnectionsPage() {
    const router = useRouter();

    const [pendingRequests, setPendingRequests] = useState<ConnectionItem[]>([]);
    const [acceptedConnections, setAcceptedConnections] = useState<ConnectionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadConnections() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            const { data, error } = await supabase
                .from("connections")
                .select("id, requester_id, recipient_id, status")
                .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
                .order("created_at", { ascending: false });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            const rows = data ?? [];
            const requesterIds = [...new Set(rows.map((row) => row.requester_id))];
            const recipientIds = [...new Set(rows.map((row) => row.recipient_id))];
            const profileIds = [...new Set([...requesterIds, ...recipientIds])];

            const { data: profilesData, error: profilesError } = await supabase
                .from("profiles")
                .select("id, first_name, last_name, company, job_title")
                .in("id", profileIds);

            if (profilesError) {
                setError(profilesError.message);
                setLoading(false);
                return;
            }

            const profileMap = new Map<string, Profile>();
            (profilesData ?? []).forEach((profile) => {
                profileMap.set(profile.id, profile);
            });

            const enriched = rows.map((row) => ({
                ...row,
                requesterProfile: profileMap.get(row.requester_id) ?? null,
                recipientProfile: profileMap.get(row.recipient_id) ?? null,
            }));

            setPendingRequests(
                enriched.filter(
                    (row) =>
                        row.status === "pending" && row.recipient_id === user.id
                )
            );

            setAcceptedConnections(
                enriched.filter(
                    (row) =>
                        row.status === "accepted" &&
                        (row.requester_id === user.id || row.recipient_id === user.id)
                )
            );

            setLoading(false);
        }

        loadConnections();
    }, [router]);

    async function handleAccept(connectionId: string) {
        setActionLoading(true);
        setError("");

        const { error } = await supabase
            .from("connections")
            .update({ status: "accepted" })
            .eq("id", connectionId);

        if (error) {
            setError(error.message);
        } else {
            setPendingRequests((current) => current.filter((c) => c.id !== connectionId));
            const accepted = pendingRequests.find((c) => c.id === connectionId);
            if (accepted) {
                setAcceptedConnections((current) => [
                    ...current,
                    { ...accepted, status: "accepted" },
                ]);
            }
        }

        setActionLoading(false);
    }

    async function handleDecline(connectionId: string) {
        setActionLoading(true);
        setError("");

        const { error } = await supabase
            .from("connections")
            .delete()
            .eq("id", connectionId);

        if (error) {
            setError(error.message);
        } else {
            setPendingRequests((current) => current.filter((c) => c.id !== connectionId));
        }

        setActionLoading(false);
    }

    async function handleRemove(connectionId: string) {
        setActionLoading(true);
        setError("");

        const { error } = await supabase
            .from("connections")
            .delete()
            .eq("id", connectionId);

        if (error) {
            setError(error.message);
        } else {
            setAcceptedConnections((current) => current.filter((c) => c.id !== connectionId));
        }

        setActionLoading(false);
    }

    function displayName(profile?: Profile | null) {
        if (!profile) return "Attendee";
        return [profile.first_name, profile.last_name].filter(Boolean).join(" ") || "Attendee";
    }

    return (
        <><Navbar />
        <main className="min-h-screen bg-slate-100 px-4 py-10">
            <div className="mx-auto w-full max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900">Connections</h1>
                    <p className="mt-2 text-slate-600">
                        Manage your pending requests and accepted connections.
                    </p>
                </div>

                {loading ? (
                    <p className="text-slate-600">Loading connections...</p>
                ) : error ? (
                    <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700">{error}</p>
                ) : (
                    <div className="grid gap-6">
                        <section className="rounded-2xl bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                Pending Requests ({pendingRequests.length})
                            </h2>

                            <div className="mt-4 space-y-3">
                                {pendingRequests.length > 0 ? (
                                    pendingRequests.map((connection) => (
                                        <div
                                            key={connection.id}
                                            className="rounded-xl bg-slate-50 px-4 py-4"
                                        >
                                            <p className="font-medium text-slate-900">
                                                {displayName(connection.requesterProfile)}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {connection.requesterProfile?.job_title || "Job title not added"}
                                                {connection.requesterProfile?.company
                                                    ? ` · ${connection.requesterProfile.company}`
                                                    : ""}
                                            </p>

                                            <div className="mt-4 flex flex-wrap gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => handleAccept(connection.id)}
                                                    disabled={actionLoading}
                                                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDecline(connection.id)}
                                                    disabled={actionLoading}
                                                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 disabled:opacity-60"
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-600">No pending requests right now.</p>
                                )}
                            </div>
                        </section>

                        <section className="rounded-2xl bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                My Connections ({acceptedConnections.length})
                            </h2>

                            <div className="mt-4 space-y-3">
                                {acceptedConnections.length > 0 ? (
                                    acceptedConnections.map((connection) => {
                                        const otherProfile =
                                            connection.requester_id === connection.recipient_id
                                                ? connection.requesterProfile
                                                : connection.requester_id === undefined
                                                    ? null
                                                    : connection.requester_id ===
                                                        connection.recipientProfile?.id
                                                        ? connection.requesterProfile
                                                        : connection.requester_id === connection.recipientProfile?.id
                                                            ? connection.requesterProfile
                                                            : connection.requester_id ===
                                                                connection.requesterProfile?.id
                                                                ? connection.recipientProfile
                                                                : connection.requesterProfile?.id ===
                                                                    connection.requester_id
                                                                    ? connection.recipientProfile
                                                                    : connection.recipientProfile;

                                        const person =
                                            connection.requesterProfile?.id === connection.recipient_id
                                                ? connection.requesterProfile
                                                : connection.recipientProfile?.id === connection.requester_id
                                                    ? connection.recipientProfile
                                                    : connection.requesterProfile?.id === connection.recipient_id
                                                        ? connection.requesterProfile
                                                        : connection.recipientProfile;

                                        const profile = person ?? otherProfile;
                                        const name = displayName(profile);

                                        return (
                                            <div
                                                key={connection.id}
                                                className="rounded-xl bg-slate-50 px-4 py-4"
                                            >
                                                <p className="font-medium text-slate-900">{name}</p>
                                                <p className="text-sm text-slate-500">
                                                    {profile?.job_title || "Job title not added"}
                                                    {profile?.company ? ` · ${profile.company}` : ""}
                                                </p>

                                                <div className="mt-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemove(connection.id)}
                                                        disabled={actionLoading}
                                                        className="text-sm text-slate-500 underline hover:text-red-600 disabled:opacity-60"
                                                    >
                                                        Remove connection
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-slate-600">No accepted connections yet.</p>
                                )}
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </main>
        </>
    );
}