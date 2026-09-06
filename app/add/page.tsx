"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addApplication } from "@/lib/storage";
import { ApplicationStatus } from "@/lib/types";

const statuses: ApplicationStatus[] = [
  "Applied",
  "Screening",
  "Interview",
  "Final",
  "Offer",
  "Rejected",
  "Withdrawn",
];

export default function AddApplication() {
  const router = useRouter();

  const [form, setForm] = useState({
    company: "",
    jobTitle: "",
    location: "",
    jobUrl: "",
    dateApplied: "",
    salary: "",
    status: "Applied" as ApplicationStatus,
    notes: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    addApplication({
      id: crypto.randomUUID(),
      ...form,
    });

    router.push("/");
  }

  function handleChange(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">

        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back to dashboard
        </Link>

        <div className="mt-6 rounded-xl bg-white p-8 shadow-sm">

          <h1 className="text-2xl font-bold">
            Add Job Application
          </h1>

          <p className="mt-2 text-gray-600">
            Add a job to your application tracker.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            <div>
              <label className="mb-2 block text-sm font-medium">
                Company
              </label>

              <input
                required
                value={form.company}
                onChange={(e) =>
                  handleChange("company", e.target.value)
                }
                placeholder="e.g. Microsoft"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Job Title
              </label>

              <input
                required
                value={form.jobTitle}
                onChange={(e) =>
                  handleChange("jobTitle", e.target.value)
                }
                placeholder="e.g. Data Analyst"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Location
              </label>

              <input
                value={form.location}
                onChange={(e) =>
                  handleChange("location", e.target.value)
                }
                placeholder="e.g. Remote / Phoenix, AZ"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Job URL
              </label>

              <input
                type="url"
                value={form.jobUrl}
                onChange={(e) =>
                  handleChange("jobUrl", e.target.value)
                }
                placeholder="https://..."
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Date Applied
                </label>

                <input
                  type="date"
                  value={form.dateApplied}
                  onChange={(e) =>
                    handleChange("dateApplied", e.target.value)
                  }
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Salary
                </label>

                <input
                  value={form.salary}
                  onChange={(e) =>
                    handleChange("salary", e.target.value)
                  }
                  placeholder="e.g. $70,000–$85,000"
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  handleChange(
                    "status",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-4 py-3"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Notes
              </label>

              <textarea
                value={form.notes}
                onChange={(e) =>
                  handleChange("notes", e.target.value)
                }
                placeholder="Recruiter contact, interview notes, follow-up date..."
                rows={5}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex gap-3">

              <Link
                href="/"
                className="flex-1 rounded-lg border px-5 py-3 text-center font-medium hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="flex-1 rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
              >
                Save Application
              </button>

            </div>

          </form>
        </div>
      </div>
    </main>
  );
}