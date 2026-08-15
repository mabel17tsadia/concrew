"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/lib/supabase";

type Crew = {
    id: string;
    name: string;
    description: string | null;
    conference_id: string;
    creator_id: string;
    max_members: number;
    visibility: string;
};

type Conference = {
    id: string;
    name: string;
    location: string | null;
};

type Profile = {
    id: string;
    first_name: string | null;
    last_name: string | null;
    company: string | null;
    school: string | null;
    job_title: string | null;
};

type Member = {
    id: string;
    user_id: string;
    profile: Profile | null;
};

function getFullName(profile: Profile | null) {
    if (!profile) return "Attendee";

    return (
        [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
        "Attendee"
    );
}

function getInitials(profile: Profile | null) {
    if (!profile) return "A";

    const first = profile.first_name?.trim()?.[0] || "";
    const last = profile.last_name?.trim()?.[0] || "";

    return `${first}${last}` || "A";
}

export default function CrewDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const crewId = Array.isArray(params.id) ? params.id[0] : params.id;

    const [crew, setCrew] = useState<Crew | null>(null);
    const [conference, setConference] = useState<Conference | null>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCrew() {
            if (!crewId) {
                setError("Crew ID is missing.");
                setLoading(false);
                return;
            }

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

            // Load crew
            const { data: crewData, error: crewError } = await supabase
                .from("crews")
                .select(
                    "id, name, description, conference_id, creator_id, max_members, visibility"
                )
                .eq("id", crewId)
                .maybeSingle();

            if (crewError) {
                setError(crewError.message);
                setLoading(false);
                return;
            }

            if (!crewData) {
                setError("Crew not found.");
                setLoading(false);
                return;
            }

            setCrew(crewData);

            // Load conference
            const { data: conferenceData, error: conferenceError } = await supabase
                .from("conferences")
                .select("id, name, location")
                .eq("id", crewData.conference_id)
                .maybeSingle();

            if (conferenceError) {
                setError(conferenceError.message);
                setLoading(false);
                return;
            }

            setConference(conferenceData ?? null);

            // Load crew membership rows
            const { data: memberRows, error: memberError } = await supabase
                .from("crew_members")
                .select("id, user_id")
                .eq("crew_id", crewId)
                .order("created_at", { ascending: true });

            if (memberError) {
                setError(memberError.message);
                setLoading(false);
                return;
            }

            const rows = memberRows ?? [];

            if (rows.length === 0) {
                setMembers([]);
                setLoading(false);
                return;
            }

            // Load member profiles
            const userIds = [...new Set(rows.map((row) => row.user_id))];

            const { data: profilesData, error: profilesError } = await supabase
                .from("profiles")
                .select(
                    "id, first_name, last_name, company, school, job_title"
                )
                .in("id", userIds);

            if (profilesError) {
                setError(profilesError.message);
                setLoading(false);
                return;
            }

            const profileMap = new Map<string, Profile>();

            (profilesData ?? []).forEach((profile) => {
                profileMap.set(profile.id, profile);
            });

            const enrichedMembers: Member[] = rows.map((row) => ({
                ...row,
                profile: profileMap.get(row.user_id) ?? null,
            }));

            setMembers(enrichedMembers);
            setLoading(false);
        }

        loadCrew();
    }, [crewId, router]);

    const isMember = members.some(
        (member) => member.user_id === currentUserId
    );

    const isCreator = crew?.creator_id === currentUserId;

    const isFull = crew
        ? members.length >= crew.max_members
        : false;

    async function handleJoinCrew() {
        if (!crewId || !currentUserId || !crew) return;

        if (isMember) return;

        if (isFull) {
            setError("This crew is already full.");
            return;
        }

        setActionLoading(true);
        setError("");

        const { data: membership, error: joinError } = await supabase
            .from("crew_members")
            .insert({
                crew_id: crewId,
                user_id: currentUserId,
            })
            .select("id, user_id")
            .single();

        if (joinError) {
            setError(joinError.message);
            setActionLoading(false);
            return;
        }

        const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select(
                "id, first_name, last_name, company, school, job_title"
            )
            .eq("id", currentUserId)
            .maybeSingle();

        if (profileError) {
            setError(profileError.message);
            setActionLoading(false);
            return;
        }

        setMembers((current) => [
            ...current,
            {
                id: membership.id,
                user_id: membership.user_id,
                profile: profileData ?? null,
            },
        ]);

        setActionLoading(false);
    }

    async function handleLeaveCrew() {
        if (!crewId || !currentUserId) return;

        if (isCreator) {
            setError(
                "The crew creator cannot leave the crew. Crew deletion can be added later."
            );
            return;
        }

        setActionLoading(true);
        setError("");

        const { error: leaveError } = await supabase
            .from("crew_members")
            .delete()
            .eq("crew_id", crewId)
            .eq("user_id", currentUserId);

        if (leaveError) {
            setError(leaveError.message);
            setActionLoading(false);
            return;
        }

        setMembers((current) =>
            current.filter((member) => member.user_id !== currentUserId)
        );

        setActionLoading(false);
    }

    if (loading) {
        return (
            <>
                <Navbar />

                <main className="min-h-screen bg-slate-100 px-4 py-10">
                    <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <p className="text-slate-600">Loading crew...</p>
                    </div>
                </main>
            </>
        );
    }

    if (!crew) {
        return (
            <>
                <Navbar />

                <main className="min-h-screen bg-slate-100 px-4 py-10">
                    <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <p className="text-red-700">
                            {error || "Crew not found."}
                        </p>

                        <Link
                            href="/crews"
                            className="mt-6 inline-block text-sm font-medium text-slate-600 underline"
                        >
                            Back to Crews
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-100 px-4 py-10">
                <div className="mx-auto w-full max-w-5xl space-y-6">
                    <Link
                        href="/crews"
                        className="inline-block text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        ← Back to Crews
                    </Link>

                    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-10 text-white">
                            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                                        Crew
                                    </p>

                                    <h1 className="mt-3 text-4xl font-semibold">
                                        {crew.name}
                                    </h1>

                                    {conference && (
                                        <p className="mt-3 text-white/80">
                                            {conference.name}
                                            {conference.location
                                                ? ` · ${conference.location}`
                                                : ""}
                                        </p>
                                    )}
                                </div>

                                <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                                    {members.length} / {crew.max_members} members
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                                    About this crew
                                </p>

                                <p className="mt-3 leading-7 text-slate-700">
                                    {crew.description || "No description has been added yet."}
                                </p>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium capitalize text-slate-600">
                                    {crew.visibility}
                                </span>

                                {isCreator && (
                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                                        You created this crew
                                    </span>
                                )}

                                {isMember && !isCreator && (
                                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                                        You&apos;re a member
                                    </span>
                                )}

                                {isFull && (
                                    <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                                        Crew full
                                    </span>
                                )}
                            </div>

                            <div className="mt-8">
                                {!isMember ? (
                                    <button
                                        type="button"
                                        onClick={handleJoinCrew}
                                        disabled={actionLoading || isFull}
                                        className="rounded-full bg-slate-900 px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {actionLoading
                                            ? "Joining..."
                                            : isFull
                                                ? "Crew Full"
                                                : "Join Crew"}
                                    </button>
                                ) : !isCreator ? (
                                    <button
                                        type="button"
                                        onClick={handleLeaveCrew}
                                        disabled={actionLoading}
                                        className="text-sm font-medium text-slate-500 underline transition hover:text-red-600 disabled:opacity-50"
                                    >
                                        {actionLoading ? "Leaving..." : "Leave Crew"}
                                    </button>
                                ) : null}
                            </div>

                            {error && (
                                <div className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-red-700">
                                    {error}
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                Crew Members
                            </h2>

                            <span className="text-sm text-slate-500">
                                {members.length} member{members.length === 1 ? "" : "s"}
                            </span>
                        </div>

                        {members.length === 0 ? (
                            <p className="mt-5 text-slate-600">
                                This crew does not have any members yet.
                            </p>
                        ) : (
                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                {members.map((member) => {
                                    const fullName = getFullName(member.profile);
                                    const initials = getInitials(member.profile);
                                    const memberIsCreator =
                                        member.user_id === crew.creator_id;

                                    return (
                                        <div
                                            key={member.id}
                                            className="rounded-2xl bg-slate-50 p-5"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white font-bold text-slate-900 shadow-sm">
                                                    {initials}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <p className="font-semibold text-slate-900">
                                                            {fullName}
                                                        </p>

                                                        {memberIsCreator && (
                                                            <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                                                Creator
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        {member.profile?.job_title ||
                                                            "Job title not added"}
                                                        {member.profile?.company
                                                            ? ` · ${member.profile.company}`
                                                            : ""}
                                                    </p>

                                                    {member.user_id !== currentUserId && (
                                                        <Link
                                                            href={`/people/${member.user_id}`}
                                                            className="mt-3 inline-block text-sm font-medium text-slate-700 underline transition hover:text-slate-900"
                                                        >
                                                            View Profile
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}