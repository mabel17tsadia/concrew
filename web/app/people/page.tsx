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

type MatchReason = {
    label: string;
    value: string;
};

type Recommendation = Profile & {
    score: number;
    reasons: MatchReason[];
};

function getFullName(profile: Profile) {
    return [profile.first_name, profile.last_name].filter(Boolean).join(" ") || "Attendee";
}

function normalize(value: string | null | undefined) {
    return value?.trim().toLowerCase() || "";
}

export default function PeoplePage() {
    const router = useRouter();

    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPeople() {
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

                const { data: myProfile, error: myProfileError } = await supabase
                    .from("profiles")
                    .select("id, first_name, last_name, bio, company, school, city, job_title")
                    .eq("id", user.id)
                    .maybeSingle();

                if (myProfileError) {
                    setError(myProfileError.message);
                    setLoading(false);
                    return;
                }

                const { data: attendance, error: attendanceError } = await supabase
                    .from("conference_attendees")
                    .select("conference_id")
                    .eq("user_id", user.id);

                if (attendanceError) {
                    setError(attendanceError.message);
                    setLoading(false);
                    return;
                }

                const joinedConferenceIds = [
                    ...new Set((attendance ?? []).map((row) => row.conference_id)),
                ];

                if (joinedConferenceIds.length === 0) {
                    setRecommendations([]);
                    setLoading(false);
                    return;
                }

                const { data: attendeeRows, error: attendeeRowsError } = await supabase
                    .from("conference_attendees")
                    .select("user_id, conference_id")
                    .in("conference_id", joinedConferenceIds);

                if (attendeeRowsError) {
                    setError(attendeeRowsError.message);
                    setLoading(false);
                    return;
                }

                const otherUserIds = [
                    ...new Set(
                        (attendeeRows ?? [])
                            .filter((row) => row.user_id !== user.id)
                            .map((row) => row.user_id)
                    ),
                ];

                if (otherUserIds.length === 0) {
                    setRecommendations([]);
                    setLoading(false);
                    return;
                }

                const { data: profiles, error: profilesError } = await supabase
                    .from("profiles")
                    .select(
                        "id, first_name, last_name, bio, company, school, city, job_title, linkedin_url, github_url"
                    )
                    .in("id", otherUserIds);

                if (profilesError) {
                    setError(profilesError.message);
                    setLoading(false);
                    return;
                }

                const currentSchool = normalize(myProfile?.school);
                const currentCompany = normalize(myProfile?.company);
                const currentCity = normalize(myProfile?.city);
                const currentJobTitle = normalize(myProfile?.job_title);

                const attendanceByUser = new Map<string, Set<string>>();
                (attendeeRows ?? []).forEach((row) => {
                    if (row.user_id === user.id) return;

                    const existing = attendanceByUser.get(row.user_id) ?? new Set<string>();
                    existing.add(row.conference_id);
                    attendanceByUser.set(row.user_id, existing);
                });

                const ranked: Recommendation[] = (profiles ?? [])
                    .map((profile) => {
                        let score = 0;
                        const reasons: MatchReason[] = [];

                        const sharedConferences = attendanceByUser.get(profile.id)?.size ?? 0;

                        if (sharedConferences > 0) {
                            score += sharedConferences * 40;
                            reasons.push({
                                label: "Conference",
                                value: `${sharedConferences} shared conference${sharedConferences === 1 ? "" : "s"}`,
                            });
                        }

                        if (currentSchool && normalize(profile.school) === currentSchool) {
                            score += 20;
                            reasons.push({
                                label: "School",
                                value: profile.school || "Same school",
                            });
                        }

                        if (currentCompany && normalize(profile.company) === currentCompany) {
                            score += 20;
                            reasons.push({
                                label: "Company",
                                value: profile.company || "Same company",
                            });
                        }

                        if (currentCity && normalize(profile.city) === currentCity) {
                            score += 10;
                            reasons.push({
                                label: "City",
                                value: profile.city || "Same city",
                            });
                        }

                        if (currentJobTitle && normalize(profile.job_title) === currentJobTitle) {
                            score += 10;
                            reasons.push({
                                label: "Job title",
                                value: profile.job_title || "Same job title",
                            });
                        }

                        if (reasons.length === 0) {
                            reasons.push({
                                label: "Connection",
                                value: "Attending the same conferences",
                            });
                        }

                        return {
                            ...profile,
                            score,
                            reasons,
                        };
                    })
                    .sort((a, b) => b.score - a.score);

                setRecommendations(ranked);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong.");
                setLoading(false);
            }
        }

        loadPeople();
    }, [router]);

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-100 px-4 py-10">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-900">People Discovery</h1>
                        <p className="mt-2 text-slate-600">
                            Discover people attending the same conferences and start finding the right connections.
                        </p>
                    </div>

                    {loading ? (
                        <p className="text-slate-600">Loading people...</p>
                    ) : error ? (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700">{error}</p>
                    ) : recommendations.length === 0 ? (
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <p className="text-slate-600">
                                No recommendations yet. Join a conference to start discovering people.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {recommendations.map((person) => {
                                const fullName = getFullName(person);
                                const matchPercentage = Math.min(person.score, 100);

                                return (
                                    <article
                                        key={person.id}
                                        className="rounded-2xl bg-white p-6 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h2 className="text-2xl font-semibold text-slate-900">
                                                    {fullName}
                                                </h2>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    {person.job_title || "Profession not added"}
                                                    {person.company ? ` · ${person.company}` : ""}
                                                </p>
                                            </div>

                                            <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                                                ⭐ {matchPercentage}% Match
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                                Why we recommend {fullName}
                                            </h3>

                                            <div className="mt-3 space-y-2">
                                                {person.reasons.map((reason, index) => (
                                                    <div
                                                        key={`${reason.label}-${reason.value}-${index}`}
                                                        className="flex items-start gap-2 text-sm text-slate-700"
                                                    >
                                                        <span className="text-green-600">✓</span>
                                                        <span>
                                                            <span className="font-medium text-slate-900">
                                                                {reason.label}:
                                                            </span>{" "}
                                                            {reason.value}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <p className="mt-4 text-slate-600">
                                            {person.bio || "No bio added yet."}
                                        </p>

                                        <Link
                                            href={`/people/${person.id}`}
                                            className="mt-6 inline-block rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                                        >
                                            View Profile
                                        </Link>
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