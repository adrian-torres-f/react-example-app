import { ApiResponse } from "@/types/api-response";
import { ProjectDetailRs, ProjectItemRs, ProjectsRs } from "./project";
import { ProjectCreateRq, ProjectUpdateRq } from "./project.schema";

const PROJECT_URL = `${process.env.NEXT_PUBLIC_API_V1_URL}/projects`;

export async function createProject(
  projectData: ProjectCreateRq
): Promise<ApiResponse<ProjectDetailRs>> {
  const res = await fetch(PROJECT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  const responseBody = await res.json();
  console.log("Response Body:", JSON.stringify(responseBody, null, 2));
  return responseBody;
}

export async function getProjectsPaged(
  page = 1,
  limit = 10,
  search: string = ""
): Promise<ApiResponse<ProjectsRs>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });

  if (search.trim()) params.append("search", search.trim());

  const res = await fetch(`${PROJECT_URL}/paginated?${params.toString()}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al obtener proyectos: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  return data;
}

export async function getProjectById(
  projectId: string
): Promise<ApiResponse<ProjectItemRs>> {
  const res = await fetch(`${PROJECT_URL}/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBody = await res.json();
  console.log("Response Body:", JSON.stringify(responseBody, null, 2));

  return responseBody;
}


export async function updateProject(
  projectId: string,
  projectData: ProjectUpdateRq
): Promise<ApiResponse<ProjectDetailRs>> {
  const res = await fetch(`${PROJECT_URL}/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  const responseBody = await res.json();
  console.log("Response Body:", JSON.stringify(responseBody, null, 2));

  return responseBody;
}


export async function deleteProject(
  id: string
): Promise<ApiResponse<ProjectsRs>> {
  const res = await fetch(`${PROJECT_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al eliminar proyecto: ${errorText || res.status}`);
  }
  return res.json();
}
