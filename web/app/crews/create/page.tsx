"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/lib/supabase";

type Conference = {
    id: string;
    name: string;
};

export default function CreateCrewPage() {
    const router = useRouter();

    const [conferences, setConferences] = useState<Conference[]>([]);
    const [conferenceId, setConferenceId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [maxMembers, setMaxMembers] = useState("8");
    const [visibility, setVisibility] = useState("public");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadConferences() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            const { data: attendanceRows, error: attendanceError } = await supabase
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
                setConferences([]);
                setLoading(false);
                return;
            }

            const { data: conferenceData, error: conferenceError } = await supabase
                .from("conferences")
                .select("id, name")
                .in("id", conferenceIds)
                .order("start_date", { ascending: true });

            if (conferenceError) {
                setError(conferenceError.message);
                setLoading(false);
                return;
            }

            setConferences(conferenceData ?? []);
            setLoading(false);
        }

        loadConferences();
    }, [router]);

    async function handleCreateCrew(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSaving(true);
        setError("");

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        if (!conferenceId) {
            setError("Please choose a conference.");
            setSaving(false);
            return;
        }

        const memberLimit = Number(maxMembers);

        if (!Number.isInteger(memberLimit) || memberLimit < 2) {
            setError("Maximum members must be at least 2.");
            setSaving(false);
            return;
        }

        const { data: crew, error: crewError } = await supabase
            .from("crews")
            .insert({
                conference_id: conferenceId,
                creator_id: user.id,
                name: name.trim(),
                description: description.trim() || null,
                max_members: memberLimit,
                visibility,
            })
            .select("id")
            .single();

        if (crewError) {
            setError(crewError.message);
            setSaving(false);
            return;
        }

        const { error: memberError } = await supabase
            .from("crew_members")
            .insert({
                crew_id: crew.id,
                user_id: user.id,
            });

        if (memberError) {
            setError(
                `The crew was created, but we could not add you as a member: ${memberError.message}`
            );
            setSaving(false);
            return;
        }

        router.push(`/crews/${crew.id}`);
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-100 px-4 py-10">
                <div className="mx-auto w-full max-w-3xl">
                    <div className="mb-8">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                            Crews
                        </p>

                        <h1 className="mt-2 text-4xl font-bold text-slate-900">
                            Create a Crew
                        </h1>

                        <p className="mt-2 max-w-2xl text-slate-600">
                            Create a smaller networking group for people attending the same
                            conference.
                        </p>
                    </div>

                    <form
                        onSubmit={handleCreateCrew}
                        className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                    >
                        {error && (
                            <div className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-red-700">
                                {error}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="conference"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Conference
                            </label>

                            {loading ? (
                                <p className="text-sm text-slate-500">
                                    Loading your conferences...
                                </p>
                            ) : conferences.length === 0 ? (
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-sm text-slate-600">
                                        You need to join a conference before you can create a crew.
                                    </p>
                                </div>
                            ) : (
                                <select
                                    id="conference"
                                    value={conferenceId}
                                    onChange={(event) => setConferenceId(event.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                                    required
                                >
                                    <option value="">Choose a conference</option>

                                    {conferences.map((conference) => (
                                        <option key={conference.id} value={conference.id}>
                                            {conference.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div className="mt-6">
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Crew name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="AI Builders"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                required
                            />
                        </div>

                        <div className="mt-6">
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                rows={5}
                                placeholder="What is this crew about? Who would benefit from joining?"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                            />
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="maxMembers"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Maximum members
                                </label>

                                <input
                                    id="maxMembers"
                                    type="number"
                                    min="2"
                                    value={maxMembers}
                                    onChange={(event) => setMaxMembers(event.target.value)}
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="visibility"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Visibility
                                </label>

                                <select
                                    id="visibility"
                                    value={visibility}
                                    onChange={(event) => setVisibility(event.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                                >
                                    <option value="public">Public</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
                            <button
                                type="button"
                                onClick={() => router.push("/crews")}
                                className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving || loading || conferences.length === 0}
                                className="rounded-full bg-slate-900 px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {saving ? "Creating..." : "Create Crew"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}