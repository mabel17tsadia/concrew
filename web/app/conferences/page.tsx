"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Conference = {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  website: string | null;
};

export default function ConferencesPage() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadConferences() {
      const { data, error } = await supabase
        .from("conferences")
        .select("id, name, description, location, start_date, end_date, website")
        .order("start_date", { ascending: true });

      if (error) {
        setError(error.message);
      } else {
        setConferences(data ?? []);
      }

      setLoading(false);
    }

    loadConferences();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Conferences</h1>
          <p className="mt-2 text-slate-600">
            Browse upcoming conferences and start planning who you want to meet.
          </p>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading conferences...</p>
        ) : error ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700">{error}</p>
        ) : conferences.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-slate-600">No conferences have been added yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {conferences.map((conference) => (
              <article
                key={conference.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <h2 className="text-2xl font-semibold text-slate-900">
                  {conference.name}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {conference.location || "Location TBD"}
                </p>

                <p className="mt-4 text-slate-600">
                  {conference.description || "No description available yet."}
                </p>

                <div className="mt-4 text-sm text-slate-500">
                  {conference.start_date && conference.end_date ? (
                    <p>
                      {conference.start_date} → {conference.end_date}
                    </p>
                  ) : (
                    <p>Date TBD</p>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href={`/conferences/${conference.id}`}
                    className="inline-block w-fit rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    View Conference
                  </Link>

                  {conference.website && (
                    <a
                      href={conference.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-slate-500 underline hover:text-slate-700"
                    >
                      Official Website ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}