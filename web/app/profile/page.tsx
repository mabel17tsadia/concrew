"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("You must be logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data) {
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
    }

    loadProfile();
  }, []);

  async function handleSaveProfile() {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      setMessage("You must be logged in.");
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

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Profile saved successfully!");
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Complete Your Profile
        </h1>

        <p className="mt-2 text-slate-600">
          Tell us a little about yourself so ConCrew can recommend the right people.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="bio" className="mb-2 block text-sm font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              rows={4}
            />
          </div>

          <div>
            <label htmlFor="company" className="mb-2 block text-sm font-medium">
              Company
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="school" className="mb-2 block text-sm font-medium">
              School
            </label>
            <input
              id="school"
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="city" className="mb-2 block text-sm font-medium">
              City
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="jobTitle" className="mb-2 block text-sm font-medium">
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="yearsExperience" className="mb-2 block text-sm font-medium">
              Years of Experience
            </label>
            <input
              id="yearsExperience"
              type="number"
              min="0"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="linkedinUrl" className="mb-2 block text-sm font-medium">
              LinkedIn URL
            </label>
            <input
              id="linkedinUrl"
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="githubUrl" className="mb-2 block text-sm font-medium">
              GitHub URL
            </label>
            <input
              id="githubUrl"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>
        </div>

        {message && (
          <p className="mt-4 rounded-lg bg-green-50 p-3 text-green-700">
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={handleSaveProfile}
          className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </main>
  );
}