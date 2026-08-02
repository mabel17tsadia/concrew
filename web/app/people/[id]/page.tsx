"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/layout/Navbar";

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

type Connection = {
    id: string;
    requester_id: string;
    recipient_id: string;
    status: string;
};

type ConnectionState =
    | "none"
    | "request_sent"
    | "incoming_request"
    | "connected";

export default function PublicProfilePage() {
    const params = useParams();
    const router = useRouter();

    const profileId = Array.isArray(params.id) ? params.id[0] : params.id;

    const [profile, setProfile] = useState<Profile | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [connection, setConnection] = useState<Connection | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");

    const connectionState = useMemo<ConnectionState>(() => {
        if (!connection) return "none";
        if (connection.status === "accepted") return "connected";
        if (connection.requester_id === currentUserId) return "request_sent";
        return "incoming_request";
    }, [connection, currentUserId]);

    useEffect(() => {
        async function loadProfile() {
            if (!profileId) {
                setError("Profile ID is missing.");
                setLoading(false);
                return;
            }

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            setCurrentUserId(user.id);

            const { data: profileData, error: profileError } = await supabase
                .from("profiles")
                .select(
                    "id, first_name, last_name, bio, company, school, city, job_title, linkedin_url, github_url"
                )
                .eq("id", profileId)
                .maybeSingle();

            if (profileError) {
                setError(profileError.message);
                setLoading(false);
                return;
            }

            setProfile(profileData ?? null);

            const { data: connectionRows, error: connectionError } = await supabase
                .from("connections")
                .select("id, requester_id, recipient_id, status")
                .in("requester_id", [user.id, profileId])
                .in("recipient_id", [user.id, profileId]);

            if (connectionError) {
                setError(connectionError.message);
                setLoading(false);
                return;
            }

            const relevantConnection = (connectionRows ?? []).find(
                (row) =>
                    (row.requester_id === user.id && row.recipient_id === profileId) ||
                    (row.requester_id === profileId && row.recipient_id === user.id)
            );

            setConnection(relevantConnection ?? null);
            setLoading(false);
        }

        loadProfile();
    }, [profileId, router]);

    async function handleConnect() {
        if (!profileId || !currentUserId) return;

        setActionLoading(true);
        setError("");

        const { error: insertError } = await supabase.from("connections").insert({
            requester_id: currentUserId,
            recipient_id: profileId,
            status: "pending",
        });

        if (insertError) {
            setError(insertError.message);
            setActionLoading(false);
            return;
        }

        setConnection({
            id: crypto.randomUUID(),
            requester_id: currentUserId,
            recipient_id: profileId,
            status: "pending",
        });

        setActionLoading(false);
    }

    async function handleAccept() {
        if (!connection) return;

        setActionLoading(true);
        setError("");

        const { error: updateError } = await supabase
            .from("connections")
            .update({ status: "accepted" })
            .eq("id", connection.id);

        if (updateError) {
            setError(updateError.message);
            setActionLoading(false);
            return;
        }

        setConnection({ ...connection, status: "accepted" });
        setActionLoading(false);
    }

    async function handleDecline() {
        if (!connection) return;

        setActionLoading(true);
        setError("");

        const { error: deleteError } = await supabase
            .from("connections")
            .delete()
            .eq("id", connection.id);

        if (deleteError) {
            setError(deleteError.message);
            setActionLoading(false);
            return;
        }

        setConnection(null);
        setActionLoading(false);
    }

    if (loading) {
        return (
            <><Navbar />
            <main className="min-h-screen bg-slate-100 px-4 py-10">
                <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
                    <p className="text-slate-600">Loading profile...</p>
                </div>
            </main>
            </>
        );
    }

    if (error) {
        return (
            <><Navbar/>
            <main className="min-h-screen bg-slate-100 px-4 py-10">
                <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
                    <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700">
                        {error}
                    </p>
                </div>
            </main>
            </>
        );
    }

    if (!profile) {
        return (
            <><Navbar/>
            <main className="min-h-screen bg-slate-100 px-4 py-10">
                <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Profile not found
                    </h1>
                    <button
                        type="button"
                        onClick={() => router.push("/people")}
                        className="mt-6 rounded-full bg-slate-900 px-5 py-3 font-medium text-white"
                    >
                        Back to People
                    </button>
                </div>
            </main>
            </>
        );
    }

    const fullName =
        [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
        "Attendee";

    const isOwnProfile = currentUserId === profile.id;

    return (
        <><Navbar/>
        <main className="min-h-screen bg-slate-100 px-4 py-10">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
                <Link
                    href="/people"
                    className="text-sm font-medium text-slate-500 underline hover:text-slate-700"
                >
                    ← Back to People
                </Link>

                <h1 className="mt-4 text-4xl font-bold text-slate-900">{fullName}</h1>

                {profile.job_title && (
                    <p className="mt-3 text-slate-600">{profile.job_title}</p>
                )}

                {isOwnProfile ? (
                    <div className="mt-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                        This is your profile
                    </div>
                ) : (
                    <div className="mt-6">
                        {connectionState === "connected" && (
                            <div className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                                Connected
                            </div>
                        )}

                        {connectionState === "request_sent" && (
                            <div className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                                Request sent
                            </div>
                        )}

                        {connectionState === "incoming_request" && (
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={handleAccept}
                                    disabled={actionLoading}
                                    className="rounded-full bg-slate-900 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {actionLoading ? "Accepting..." : "Accept"}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDecline}
                                    disabled={actionLoading}
                                    className="rounded-full border border-slate-300 px-5 py-3 font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {actionLoading ? "Declining..." : "Decline"}
                                </button>
                            </div>
                        )}

                        {connectionState === "none" && (
                            <button
                                type="button"
                                onClick={handleConnect}
                                disabled={actionLoading}
                                className="rounded-full bg-slate-900 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {actionLoading ? "Sending..." : "Connect"}
                            </button>
                        )}
                    </div>
                )}

                <div className="mt-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900">Bio</h2>
                        <p className="mt-2 text-slate-700">
                            {profile.bio || "No bio added yet."}
                        </p>
                    </section>

                    <section className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Company</p>
                            <p className="mt-1 text-slate-900">
                                {profile.company || "Not added"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">School</p>
                            <p className="mt-1 text-slate-900">
                                {profile.school || "Not added"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">City</p>
                            <p className="mt-1 text-slate-900">
                                {profile.city || "Not added"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Job Title</p>
                            <p className="mt-1 text-slate-900">
                                {profile.job_title || "Not added"}
                            </p>
                        </div>
                    </section>

                    <section className="flex flex-wrap gap-3">
                        {profile.linkedin_url && (
                            <a
                                href={profile.linkedin_url}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-slate-900 px-5 py-3 font-medium text-white"
                            >
                                LinkedIn
                            </a>
                        )}

                        {profile.github_url && (
                            <a
                                href={profile.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-slate-300 px-5 py-3 font-medium text-slate-900"
                            >
                                GitHub
                            </a>
                        )}
                    </section>
                </div>
            </div>
        </main>
        </>
    );
}