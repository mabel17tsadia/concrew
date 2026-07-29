"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

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
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                ConCrew Dashboard
              </p>
              <h1 className="mt-2 text-4xl font-bold text-slate-900">
                Welcome back, {firstName}!
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Your conference profile is ready to grow. Finish a few more
                details and ConCrew will be ready to help you discover the
                right people.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/profile"
                className="rounded-full bg-slate-900 px-5 py-3 font-medium text-white transition hover:opacity-90"
              >
                Edit Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-300 px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Log Out
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                Profile Completion
              </h2>
              <span className="text-sm font-medium text-slate-600">
                {loading ? "..." : `${completion}%`}
              </span>
            </div>

            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-slate-900 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>

            <p className="mt-4 text-slate-600">
              Complete your profile to improve your conference recommendations.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              What’s missing?
            </h2>

            <div className="mt-4 space-y-3">
              {missingFields.length > 0 ? (
                missingFields.map((field) => (
                  <div
                    key={field.label}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                  >
                    <span className="text-slate-700">{field.label}</span>
                    <span className="text-sm text-slate-400">Incomplete</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-600">
                  Nice work — your profile is fully complete.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}