"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getApplications } from "@/lib/storage";
import { JobApplication } from "@/lib/types";

export default function Home() {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const total = applications.length;

  const interviews = applications.filter(
    (app) =>
      app.status === "Interview" ||
      app.status === "Final"
  ).length;

  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Job Application Tracker
            </h1>

            <p className="mt-2 text-gray-600">
              Keep track of your job search in one place.
            </p>
          </div>

          <Link
            href="/add"
            className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
          >
            + Add Application
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Applications
            </p>

            <p className="mt-2 text-3xl font-bold">
              {total}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Interviews
            </p>

            <p className="mt-2 text-3xl font-bold">
              {interviews}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Offers
            </p>

            <p className="mt-2 text-3xl font-bold">
              {offers}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Rejected
            </p>

            <p className="mt-2 text-3xl font-bold">
              {rejected}
            </p>
          </div>

        </div>

        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Recent Applications
          </h2>

          {applications.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                No applications yet.
              </p>

              <Link
                href="/add"
                className="mt-4 inline-block text-sm font-medium underline"
              >
                Add your first application
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {application.jobTitle}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {application.company}
                      </p>
                    </div>

                    <span className="text-sm">
                      {application.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </main>
  );
}