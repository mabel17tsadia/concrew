"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/layout/Navbar";

type Conference = {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  website: string | null;
};

type AttendeeProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  job_title: string | null;
};

export default function ConferenceDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const conferenceId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [conference, setConference] = useState<Conference | null>(null);
  const [attendees, setAttendees] = useState<AttendeeProfile[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadConference() {
      if (!conferenceId) {
        setError("Conference ID is missing.");
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

      const { data: conferenceData, error: conferenceError } = await supabase
        .from("conferences")
        .select("id, name, description, location, start_date, end_date, website")
        .eq("id", conferenceId)
        .maybeSingle();

      if (conferenceError) {
        setError(conferenceError.message);
        setLoading(false);
        return;
      }

      setConference(conferenceData ?? null);

      const { data: attendanceData, error: attendanceError } = await supabase
        .from("conference_attendees")
        .select("user_id")
        .eq("conference_id", conferenceId);

      if (attendanceError) {
        setError(attendanceError.message);
        setLoading(false);
        return;
      }

      const attendeeIds = (attendanceData ?? []).map((row) => row.user_id);

      if (attendeeIds.length > 0) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, company, job_title")
          .in("id", attendeeIds);

        if (profileError) {
          setError(profileError.message);
          setLoading(false);
          return;
        }

        setAttendees(profileData ?? []);
      } else {
        setAttendees([]);
      }

      const { data: myAttendance } = await supabase
        .from("conference_attendees")
        .select("id")
        .eq("user_id", user.id)
        .eq("conference_id", conferenceId)
        .maybeSingle();

      if (myAttendance) {
        setJoined(true);
      }

      setLoading(false);
    }

    loadConference();
  }, [conferenceId, router]);

  async function handleJoinConference() {
    setActionLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setActionLoading(false);
      router.push("/login");
      return;
    }

    const { error: joinError } = await supabase
      .from("conference_attendees")
      .insert({
        user_id: user.id,
        conference_id: conferenceId,
      });

    if (joinError) {
      setError(joinError.message);
      setActionLoading(false);
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, company, job_title")
      .eq("id", user.id)
      .maybeSingle();

    if (profileData) {
      setAttendees((current) => {
        const alreadyThere = current.some((attendee) => attendee.id === user.id);
        if (alreadyThere) return current;
        return [profileData, ...current];
      });
    }

    setJoined(true);
    setActionLoading(false);
  }

  async function handleLeaveConference() {
    setActionLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setActionLoading(false);
      router.push("/login");
      return;
    }

    const { error: leaveError } = await supabase
      .from("conference_attendees")
      .delete()
      .eq("user_id", user.id)
      .eq("conference_id", conferenceId);

    if (leaveError) {
      setError(leaveError.message);
      setActionLoading(false);
      return;
    }

    setJoined(false);
    setAttendees((current) =>
      current.filter((attendee) => attendee.id !== user.id)
    );
    setActionLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-slate-600">Loading conference details...</p>
        </div>
      </main>
    );
  }

  if (error && !conference) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
          <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700">
            {error}
          </p>
        </div>
      </main>
    );
  }

  if (!conference) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Conference not found
          </h1>
          <button
            type="button"
            onClick={() => router.push("/conferences")}
            className="mt-6 rounded-full bg-slate-900 px-5 py-3 font-medium text-white"
          >
            Back to Conferences
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <Link
          href="/conferences"
          className="text-sm font-medium text-slate-500 underline hover:text-slate-700"
        >
          ← Back to Conferences
        </Link>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          {conference.name}
        </h1>

        <p className="mt-3 text-slate-600">
          {conference.location || "Location TBD"}
        </p>

        <p className="mt-6 text-slate-700">
          {conference.description || "No description available yet."}
        </p>

        <div className="mt-6 text-slate-500">
          {conference.start_date && conference.end_date ? (
            <p>
              {conference.start_date} → {conference.end_date}
            </p>
          ) : (
            <p>Date TBD</p>
          )}
        </div>

        {conference.website && (
          <a
            href={conference.website}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block text-sm font-medium text-slate-900 underline"
          >
            Official Website ↗
          </a>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        <div className="mt-10">
          <div
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${joined
                ? "bg-green-50 text-green-700"
                : "bg-slate-100 text-slate-600"
              }`}
          >
            {joined ? "🟢 You're attending" : "Not attending yet"}
          </div>

          {joined ? (
            <button
              type="button"
              onClick={handleLeaveConference}
              disabled={actionLoading}
              className="mt-3 block text-sm text-slate-500 underline transition hover:text-red-600 disabled:opacity-50"
            >
              {actionLoading ? "Leaving..." : "Leave conference"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleJoinConference}
              disabled={actionLoading}
              className="mt-4 rounded-full bg-slate-900 px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {actionLoading ? "Joining..." : "Join Conference"}
            </button>
          )}
        </div>

        <section className="mt-10 rounded-2xl bg-slate-50 p-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Who&apos;s Attending ({attendees.length})
          </h2>

          <div className="mt-4 space-y-3">
            {attendees.length > 0 ? (
              attendees.map((attendee) => {
                const name =
                  [attendee.first_name, attendee.last_name]
                    .filter(Boolean)
                    .join(" ") || "Attendee";

                return (
                  <Link
                    key={attendee.id}
                    href={`/people/${attendee.id}`}
                    className="block rounded-xl bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
                  >
                    <p className="font-medium text-slate-900">{name}</p>
                    <p className="text-sm text-slate-500">
                      {[attendee.job_title, attendee.company]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </Link>
                );
              })
            ) : (
              <p className="text-slate-600">
                No attendees yet. Be the first to join.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}