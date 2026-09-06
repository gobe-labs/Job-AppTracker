export type ApplicationStatus =
  | "Applied"
  | "Screening"
  | "Interview"
  | "Final"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export interface JobApplication {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  jobUrl: string;
  dateApplied: string;
  salary: string;
  status: ApplicationStatus;
  notes: string;
}