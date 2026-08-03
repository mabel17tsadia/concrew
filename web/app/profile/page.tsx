"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/lib/supabase";

type Feedback = {
  type: "success" | "error";
  text: string;
} | null;

export default function ProfilePage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [company, setCompany] = useState("");
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

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
          "first_name, last_name, bio, company, school, city, job_title, linkedin_url, github_url, years_experience"
        )
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        setFeedback({ type: "error", text: error.message });
      } else if (data) {
        setFirstName(data.first_name ?? "");
        setLastName(data.last_name ?? "");
        setBio(data.bio ?? "");
        setCompany(data.company ?? "");
        setSchool(data.school ?? "");
        setCity(data.city ?? "");
        setJobTitle(data.job_title ?? "");
        setYearsExperience(
          data.years_experience !== null && data.years_experience !== undefined
            ? String(data.years_experience)
            : ""
        );
        setLinkedinUrl(data.linkedin_url ?? "");
        setGithubUrl(data.github_url ?? "");
      }

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function handleSaveProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      setFeedback({ type: "error", text: "You must be logged in." });
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      bio,
      company,
      school,
      city,
      job_title: jobTitle,
      years_experience: yearsExperience ? Number(yearsExperience) : null,
      linkedin_url: linkedinUrl,
      github_url: githubUrl,
    });

    setSaving(false);

    if (error) {
      setFeedback({ type: "error", text: error.message });
      return;
    }

    setFeedback({ type: "success", text: "Profile saved successfully!" });
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-100 px-4 py-10">
          <div className="mx-auto w-full max-w-5xl">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-slate-600">Loading profile...</p>
            </div>
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
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-10 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                Profile
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                Complete your profile
              </h1>
              <p className="mt-3 max-w-2xl text-white/80">
                Tell people who you are, what you do, and where they can find
                you.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="grid gap-6 p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="Mabel"
                    required
                  />
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="Tsadia"
                    required
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <label
                  htmlFor="bio"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={5}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                  placeholder="Tell people a little about yourself..."
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="Arizona State University"
                  />
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <label
                    htmlFor="school"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    School
                  </label>
                  <input
                    id="school"
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="Arizona State University"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="Tempe"
                  />
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <label
                    htmlFor="jobTitle"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Job title
                  </label>
                  <input
                    id="jobTitle"
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="Software Engineering Student"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <label
                    htmlFor="yearsExperience"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Years of experience
                  </label>
                  <input
                    id="yearsExperience"
                    type="number"
                    min="0"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="2"
                  />
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <label
                    htmlFor="linkedinUrl"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    LinkedIn URL
                  </label>
                  <input
                    id="linkedinUrl"
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                    placeholder="https://linkedin.com/in/yourname"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <label
                  htmlFor="githubUrl"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  GitHub URL
                </label>
                <input
                  id="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-900"
                  placeholder="https://github.com/yourname"
                />
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-slate-500">
                  Changes are saved to Supabase when you click Save Profile.
                </p>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-slate-900 px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          </section>

          {feedback && (
            <div
              className={`rounded-2xl border px-4 py-3 shadow-sm ${feedback.type === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
                }`}
            >
              {feedback.text}
            </div>
          )}
        </div>
      </main>
    </>
  );
}