import { JobApplication } from "./types";

const STORAGE_KEY = "job-applications";

export function getApplications(): JobApplication[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveApplications(
  applications: JobApplication[]
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(applications)
  );
}

export function addApplication(
  application: JobApplication
): void {
  const applications = getApplications();

  saveApplications([
    ...applications,
    application,
  ]);
}

export function deleteApplication(id: string): void {
  const applications = getApplications();

  saveApplications(
    applications.filter(
      (application) => application.id !== id
    )
  );
}