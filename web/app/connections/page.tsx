"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/lib/supabase";

type Profile = {
    id: string;
    first_name: string | null;
    last_name: string | null;
    bio: string | null;
    company: string | null;
    school: string | null;
    city: string | null;
    job_title: string | null;
    linkedin_url: string | null;
    github_url: string | null;
};

type ConnectionRow = {
    id: string;
    requester_id: string;
    recipient_id: string;
    status: string;
};

type EnrichedConnection = ConnectionRow & {
    requesterProfile: Profile | null;
    recipientProfile: Profile | null;
};

function getFullName(profile: Profile | null) {
    if (!profile) return "Attendee";
    return [profile.first_name, profile.last_name].filter(Boolean).join(" ") || "Attendee";
}

function getInitials(profile: Profile | null) {
    if (!profile) return "A";

    const first = profile.first_name?.trim()?.[0] || "";
    const last = profile.last_name?.trim()?.[0] || "";
    const initials = `${first}${last}`.trim();

    return initials || "A";
}

function getOtherProfile(connection: EnrichedConnection, currentUserId: string) {
    return connection.requester_id === currentUserId
        ? connection.recipientProfile
        : connection.requesterProfile;
}

export default function ConnectionsPage() {
    const router = useRouter();

    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [pendingIncoming, setPendingIncoming] = useState<EnrichedConnection[]>([]);
    const [pendingSent, setPendingSent] = useState<EnrichedConnection[]>([]);
    const [acceptedConnections, setAcceptedConnections] = useState<EnrichedConnection[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadConnections() {
            try {
                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError) {
                    setError(userError.message);
                    setLoading(false);
                    return;
                }

                if (!user) {
                    router.push("/login");
                    return;
                }

                setCurrentUserId(user.id);

                const { data: connectionsData, error: connectionsError } = await supabase
                    .from("connections")
                    .select("id, requester_id, recipient_id, status")
                    .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
                    .order("created_at", { ascending: false });

                if (connectionsError) {
                    setError(connectionsError.message);
                    setLoading(false);
                    return;
                }

                const connections = connectionsData ?? [];
                const profileIds = [
                    ...new Set(
                        connections.flatMap((row) => [row.requester_id, row.recipient_id])
                    ),
                ];

                const { data: profilesData, error: profilesError } = await supabase
                    .from("profiles")
                    .select(
                        "id, first_name, last_name, bio, company, school, city, job_title, linkedin_url, github_url"
                    )
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

                const enriched: EnrichedConnection[] = connections.map((row) => ({
                    ...row,
                    requesterProfile: profileMap.get(row.requester_id) ?? null,
                    recipientProfile: profileMap.get(row.recipient_id) ?? null,
                }));

                setPendingIncoming(
                    enriched.filter(
                        (row) => row.status === "pending" && row.recipient_id === user.id
                    )
                );

                setPendingSent(
                    enriched.filter(
                        (row) => row.status === "pending" && row.requester_id === user.id
                    )
                );

                setAcceptedConnections(
                    enriched.filter((row) => row.status === "accepted")
                );

                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong.");
                setLoading(false);
            }
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
            const accepted = pendingIncoming.find((connection) => connection.id === connectionId);
            if (accepted) {
                setPendingIncoming((current) =>
                    current.filter((connection) => connection.id !== connectionId)
                );
                setAcceptedConnections((current) => [
                    {
                        ...accepted,
                        status: "accepted",
                    },
                    ...current,
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
            setPendingIncoming((current) =>
                current.filter((connection) => connection.id !== connectionId)
            );
        }

        setActionLoading(false);
    }

    async function handleCancel(connectionId: string) {
        setActionLoading(true);
        setError("");

        const { error } = await supabase
            .from("connections")
            .delete()
            .eq("id", connectionId);

        if (error) {
            setError(error.message);
        } else {
            setPendingSent((current) =>
                current.filter((connection) => connection.id !== connectionId)
            );
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
            setAcceptedConnections((current) =>
                current.filter((connection) => connection.id !== connectionId)
            );
        }

        setActionLoading(false);
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-100 px-4 py-10">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-900">Connections</h1>
                        <p className="mt-2 max-w-2xl text-slate-600">
                            Manage your connection requests and keep track of the people you have connected with.
                        </p>
                    </div>

                    {loading ? (
                        <p className="text-slate-600">Loading connections...</p>
                    ) : error ? (
                        <p className="rounded-2xl bg-red-50 px-4 py-3 text-red-700 shadow-sm">
                            {error}
                        </p>
                    ) : (
                        <div className="grid gap-6">
                            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="text-2xl font-semibold text-slate-900">
                                        Incoming Requests
                                    </h2>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                                        {pendingIncoming.length}
                                    </span>
                                </div>

                                <div className="mt-5 space-y-4">
                                    {pendingIncoming.length > 0 ? (
                                        pendingIncoming.map((connection) => {
                                            const person = connection.requesterProfile;
                                            const fullName = getFullName(person);
                                            const initials = getInitials(person);

                                            return (
                                                <div
                                                    key={connection.id}
                                                    className="rounded-2xl bg-slate-50 p-5"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-900 shadow-sm">
                                                                {initials}
                                                            </div>

                                                            <div>
                                                                <p className="text-lg font-semibold text-slate-900">
                                                                    {fullName}
                                                                </p>
                                                                <p className="text-sm text-slate-500">
                                                                    {person?.job_title || "Job title not added"}
                                                                    {person?.company ? ` · ${person.company}` : ""}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                                                            Pending
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 flex flex-wrap gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAccept(connection.id)}
                                                            disabled={actionLoading}
                                                            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                                        >
                                                            {actionLoading ? "Accepting..." : "Accept"}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleDecline(connection.id)}
                                                            disabled={actionLoading}
                                                            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                                        >
                                                            {actionLoading ? "Declining..." : "Decline"}
                                                        </button>

                                                        <Link
                                                            href={`/people/${person?.id}`}
                                                            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                                                        >
                                                            View Profile
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-slate-600">No incoming requests right now.</p>
                                    )}
                                </div>
                            </section>

                            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="text-2xl font-semibold text-slate-900">
                                        Sent Requests
                                    </h2>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                                        {pendingSent.length}
                                    </span>
                                </div>

                                <div className="mt-5 space-y-4">
                                    {pendingSent.length > 0 ? (
                                        pendingSent.map((connection) => {
                                            const person = connection.recipientProfile;
                                            const fullName = getFullName(person);
                                            const initials = getInitials(person);

                                            return (
                                                <div
                                                    key={connection.id}
                                                    className="rounded-2xl bg-slate-50 p-5"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-900 shadow-sm">
                                                                {initials}
                                                            </div>

                                                            <div>
                                                                <p className="text-lg font-semibold text-slate-900">
                                                                    {fullName}
                                                                </p>
                                                                <p className="text-sm text-slate-500">
                                                                    {person?.job_title || "Job title not added"}
                                                                    {person?.company ? ` · ${person.company}` : ""}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                                                            Sent
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 flex flex-wrap gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleCancel(connection.id)}
                                                            disabled={actionLoading}
                                                            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                                        >
                                                            {actionLoading ? "Cancelling..." : "Cancel Request"}
                                                        </button>

                                                        <Link
                                                            href={`/people/${person?.id}`}
                                                            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                                                        >
                                                            View Profile
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-slate-600">No sent requests right now.</p>
                                    )}
                                </div>
                            </section>

                            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="text-2xl font-semibold text-slate-900">
                                        My Connections
                                    </h2>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                                        {acceptedConnections.length}
                                    </span>
                                </div>

                                <div className="mt-5 space-y-4">
                                    {acceptedConnections.length > 0 ? (
                                        acceptedConnections.map((connection) => {
                                            const person =
                                                currentUserId && connection.requester_id === currentUserId
                                                    ? connection.recipientProfile
                                                    : connection.requesterProfile;

                                            const fullName = getFullName(person);
                                            const initials = getInitials(person);

                                            return (
                                                <div
                                                    key={connection.id}
                                                    className="rounded-2xl bg-slate-50 p-5"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-900 shadow-sm">
                                                                {initials}
                                                            </div>

                                                            <div>
                                                                <p className="text-lg font-semibold text-slate-900">
                                                                    {fullName}
                                                                </p>
                                                                <p className="text-sm text-slate-500">
                                                                    {person?.job_title || "Job title not added"}
                                                                    {person?.company ? ` · ${person.company}` : ""}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                                                            Connected
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 flex flex-wrap gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemove(connection.id)}
                                                            disabled={actionLoading}
                                                            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                                        >
                                                            {actionLoading ? "Removing..." : "Remove Connection"}
                                                        </button>

                                                        <Link
                                                            href={`/people/${person?.id}`}
                                                            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                                        >
                                                            View Profile
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-slate-600">You do not have any accepted connections yet.</p>
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