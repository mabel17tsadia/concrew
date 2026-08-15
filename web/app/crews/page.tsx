"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

type CrewCard = Crew & {
    conference: Conference | null;
    memberCount: number;
    isMember: boolean;
};

export default function CrewsPage() {
    const router = useRouter();

    const [crews, setCrews] = useState<CrewCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCrews() {
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

                // 1. Find conferences the current user has joined.
                const { data: attendanceRows, error: attendanceError } =
                    await supabase
                        .from("conference_attendees")
                        .select("conference_id")
                        .eq("user_id", user.id);

                if (attendanceError) {
                    setError(attendanceError.message);
                    setLoading(false);
                    return;
                }

                const conferenceIds = [
                    ...new Set(
                        (attendanceRows ?? []).map((row) => row.conference_id)
                    ),
                ];

                if (conferenceIds.length === 0) {
                    setCrews([]);
                    setLoading(false);
                    return;
                }

                // 2. Load crews belonging to those conferences.
                const { data: crewRows, error: crewError } = await supabase
                    .from("crews")
                    .select(
                        "id, name, description, conference_id, creator_id, max_members, visibility"
                    )
                    .in("conference_id", conferenceIds)
                    .eq("visibility", "public")
                    .order("created_at", { ascending: false });

                if (crewError) {
                    setError(crewError.message);
                    setLoading(false);
                    return;
                }

                const crewData = crewRows ?? [];

                if (crewData.length === 0) {
                    setCrews([]);
                    setLoading(false);
                    return;
                }

                // 3. Load conference information.
                const { data: conferenceRows, error: conferenceError } =
                    await supabase
                        .from("conferences")
                        .select("id, name, location")
                        .in("id", conferenceIds);

                if (conferenceError) {
                    setError(conferenceError.message);
                    setLoading(false);
                    return;
                }

                const conferenceMap = new Map<string, Conference>();

                (conferenceRows ?? []).forEach((conference) => {
                    conferenceMap.set(conference.id, conference);
                });

                // 4. Load memberships for the crews.
                const crewIds = crewData.map((crew) => crew.id);

                const { data: membershipRows, error: membershipError } =
                    await supabase
                        .from("crew_members")
                        .select("crew_id, user_id")
                        .in("crew_id", crewIds);

                if (membershipError) {
                    setError(membershipError.message);
                    setLoading(false);
                    return;
                }

                const memberships = membershipRows ?? [];

                // 5. Build cards with member counts and membership status.
                const cards: CrewCard[] = crewData.map((crew) => {
                    const crewMemberships = memberships.filter(
                        (membership) => membership.crew_id === crew.id
                    );

                    return {
                        ...crew,
                        conference:
                            conferenceMap.get(crew.conference_id) ?? null,
                        memberCount: crewMemberships.length,
                        isMember: crewMemberships.some(
                            (membership) => membership.user_id === user.id
                        ),
                    };
                });

                setCrews(cards);
                setLoading(false);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong while loading crews."
                );

                setLoading(false);
            }
        }

        loadCrews();
    }, [router]);

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-100 px-4 py-10">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                                Networking Groups
                            </p>

                            <h1 className="mt-2 text-4xl font-bold text-slate-900">
                                Crews
                            </h1>

                            <p className="mt-2 max-w-2xl text-slate-600">
                                Join smaller groups of attendees and start building
                                meaningful connections before the conference.
                            </p>
                        </div>

                        <Link
                            href="/crews/create"
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            + Create Crew
                        </Link>
                    </div>

                    {loading ? (
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <p className="text-slate-600">Loading crews...</p>
                        </div>
                    ) : error ? (
                        <div className="rounded-2xl bg-red-50 px-4 py-3 text-red-700">
                            {error}
                        </div>
                    ) : crews.length === 0 ? (
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                No crews yet
                            </h2>

                            <p className="mt-2 max-w-xl text-slate-600">
                                There aren't any public crews for your conferences yet.
                                You can be the first person to create one.
                            </p>

                            <Link
                                href="/crews/create"
                                className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                Create a Crew
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {crews.map((crew) => {
                                const isFull =
                                    crew.memberCount >= crew.max_members;

                                return (
                                    <article
                                        key={crew.id}
                                        className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                                    >
                                        <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-6 text-white">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                                                        Crew
                                                    </p>

                                                    <h2 className="mt-2 text-2xl font-semibold">
                                                        {crew.name}
                                                    </h2>
                                                </div>

                                                <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-medium capitalize">
                                                    {crew.visibility}
                                                </span>
                                            </div>

                                            {crew.conference && (
                                                <div className="mt-4">
                                                    <p className="text-sm font-medium text-white/90">
                                                        {crew.conference.name}
                                                    </p>

                                                    {crew.conference.location && (
                                                        <p className="mt-1 text-sm text-white/60">
                                                            {crew.conference.location}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-1 flex-col p-6">
                                            <p className="leading-6 text-slate-600">
                                                {crew.description ||
                                                    "No description has been added for this crew yet."}
                                            </p>

                                            <div className="mt-5 flex flex-wrap gap-2">
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                                                    {crew.memberCount} / {crew.max_members} members
                                                </span>

                                                {crew.isMember && (
                                                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                                                        Joined
                                                    </span>
                                                )}

                                                {isFull && !crew.isMember && (
                                                    <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                                                        Full
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-auto pt-6">
                                                <Link
                                                    href={`/crews/${crew.id}`}
                                                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                                >
                                                    {crew.isMember
                                                        ? "View Crew"
                                                        : isFull
                                                            ? "View Crew"
                                                            : "View & Join"}
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}