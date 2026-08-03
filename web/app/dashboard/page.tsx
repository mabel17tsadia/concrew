"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/lib/supabase";

type Profile = {
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

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
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
          "first_name, last_name, bio, company, school, city, job_title, linkedin_url, github_url"
        )
        .eq("id", user.id)
        .maybeSingle();

      if (!error) {
        setProfile(data ?? null);
      }

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  const firstName = profile?.first_name || "there";

  const fields = [
    { label: "First name", value: profile?.first_name },
    { label: "Last name", value: profile?.last_name },
    { label: "Bio", value: profile?.bio },
    { label: "Company", value: profile?.company },
    { label: "School", value: profile?.school },
    { label: "City", value: profile?.city },
    { label: "Job title", value: profile?.job_title },
    { label: "LinkedIn", value: profile?.linkedin_url },
    { label: "GitHub", value: profile?.github_url },
  ];

  const completedFields = fields.filter(
    (field) => field.value && field.value.trim() !== ""
  ).length;

  const completion = Math.round((completedFields / fields.length) * 100);

  const missingFields = fields.filter(
    (field) => !field.value || field.value.trim() === ""
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-10 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                ConCrew Dashboard
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                Welcome back, {firstName}!
              </h1>

              <p className="mt-3 max-w-2xl text-white/80">
                Your conference profile is ready to grow. Finish a few more
                details and ConCrew will be ready to help you discover the right
                people.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/people"
                  className="rounded-full bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  Discover People
                </Link>

                <Link
                  href="/conferences"
                  className="rounded-full border border-white/20 px-5 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  Browse Conferences
                </Link>

                <Link
                  href="/profile"
                  className="rounded-full border border-white/20 px-5 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  Finish Profile
                </Link>
              </div>
            </div>

            <div className="grid gap-0 border-t border-slate-200 md:grid-cols-2">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Profile Completion
                  </h2>
                  <span className="text-sm font-medium text-slate-500">
                    {loading ? "..." : `${completion}%`}
                  </span>
                </div>

                <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-slate-900 transition-all"
                    style={{ width: `${completion}%` }}
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Completed
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">
                      {completedFields}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Missing
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">
                      {missingFields.length}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  Complete your profile to improve your conference
                  recommendations.
                </p>
              </div>

              <div className="border-t border-slate-200 p-6 md:border-l md:border-t-0">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What&apos;s missing?
                </h2>

                <div className="mt-4 space-y-3">
                  {missingFields.length > 0 ? (
                    missingFields.map((field) => (
                      <div
                        key={field.label}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                      >
                        <span className="text-slate-700">{field.label}</span>
                        <span className="text-sm text-slate-400">
                          Incomplete
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-600">
                      Nice work — your profile is fully complete.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                Next step
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                Complete your profile
              </h3>
              <p className="mt-3 text-slate-600">
                Add the last few details so ConCrew can improve your matches.
              </p>
              <Link
                href="/profile"
                className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Open Profile
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                Shortcuts
              </p>
              <div className="mt-4 space-y-3">
                <Link
                  href="/conferences"
                  className="block rounded-2xl bg-slate-50 px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                >
                  Browse conferences
                </Link>
                <Link
                  href="/people"
                  className="block rounded-2xl bg-slate-50 px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                >
                  Discover people
                </Link>
                <Link
                  href="/connections"
                  className="block rounded-2xl bg-slate-50 px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                >
                  Manage connections
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                Profile snapshot
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>Company</span>
                  <span className="font-medium text-slate-900">
                    {profile?.company || "Not added"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>School</span>
                  <span className="font-medium text-slate-900">
                    {profile?.school || "Not added"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>City</span>
                  <span className="font-medium text-slate-900">
                    {profile?.city || "Not added"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span>Job title</span>
                  <span className="font-medium text-slate-900">
                    {profile?.job_title || "Not added"}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}