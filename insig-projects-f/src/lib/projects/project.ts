export type ProjectStatus = "SUCCESS" | "FAILURE";

export interface Project {
  id: string
  title: string
  status: "SUCCESS" | "FAILURE"
  startDate: string
  endDate: string
  timeSpentHours: number
  teamSize: number
  techStack: string[]
  reason: string
  learnings: string
  createdAt: string
  userId: number
}

export interface ProjectsRs {
  projects: Project[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface ProjectItemRs {
  id: string
  title: string
  status: ProjectStatus
  startDate: string
  endDate: string
  timeSpentHours: number
  teamSize: number
  techStack: string[]
  reason: string
  learnings: string
}

export interface ProjectDetailRs {
  id: string;
  title: string;
  status: ProjectStatus;
  startDate: string; // formato ISO o YYYY-MM-DD
  timeSpentHours: number;
  teamSize: number;
}
