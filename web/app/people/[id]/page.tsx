"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();

  const profileId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, first_name, last_name, bio, company, school, city, job_title, linkedin_url, github_url"
        )
        .eq("id", profileId)
        .maybeSingle();

      if (error) {
        setError(error.message);
      } else {
        setProfile(data ?? null);
      }

      setLoading(false);
    }

    loadProfile();
  }, [profileId, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
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

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Profile not found
          </h1>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-6 rounded-full bg-slate-900 px-5 py-3 font-medium text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  const fullName =
    [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
    "Attendee";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-slate-500 underline hover:text-slate-700"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">{fullName}</h1>

        {profile.job_title && (
          <p className="mt-3 text-slate-600">{profile.job_title}</p>
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
  );
}
