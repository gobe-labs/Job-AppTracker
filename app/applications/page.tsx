"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteApplication, getApplications } from "@/lib/storage";
import {
  ApplicationStatus,
  JobApplication,
} from "@/lib/types";

const statuses: ApplicationStatus[] = [
  "Applied",
  "Screening",
  "Interview",
  "Final",
  "Offer",
  "Rejected",
  "Withdrawn",
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    ApplicationStatus | "All"
  >("All");

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    deleteApplication(id);

    setApplications((current) =>
      current.filter((application) => application.id !== id)
    );
  }

  const filteredApplications = applications.filter(
    (application) => {
      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        application.jobTitle
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-black"
            >
              ← Dashboard
            </Link>

            <h1 className="mt-3 text-3xl font-bold">
              Applications
            </h1>

            <p className="mt-2 text-gray-600">
              Manage and track all your job applications.
            </p>
          </div>

          <Link
            href="/add"
            className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
          >
            + Add Application
          </Link>
        </div>

        {/* Search + Filter */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search company or job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as ApplicationStatus | "All"
              )
            }
            className="rounded-lg border bg-white px-4 py-3"
          >
            <option value="All">All statuses</option>

            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Applications */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">
              <p className="text-gray-500">
                No applications found.
              </p>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <div
                key={application.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>
                    <h2 className="text-lg font-semibold">
                      {application.jobTitle}
                    </h2>

                    <p className="text-gray-600">
                      {application.company}
                    </p>

                    <div className="mt-2 text-sm text-gray-500">
                      {application.location && (
                        <span>
                          {application.location}
                        </span>
                      )}

                      {application.dateApplied && (
                        <span className="ml-4">
                          Applied: {application.dateApplied}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                      {application.status}
                    </span>

                    {application.jobUrl && (
                      <a
                        href={application.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Job Posting
                      </a>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(application.id)
                      }
                      className="rounded-lg border px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {application.notes && (
                  <div className="mt-4 border-t pt-4 text-sm text-gray-600">
                    {application.notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}