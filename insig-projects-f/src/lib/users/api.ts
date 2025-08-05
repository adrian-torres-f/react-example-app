import { ApiResponse } from "@/types/api-response";
import { UserDetailRs, UserItemRs, UsersRs } from "./user";
import { UserCreateRq } from "./user.schema";
import { ProjectsRs } from "../projects/project";

const USER_URL = `${process.env.NEXT_PUBLIC_API_V1_URL}/users`;

export async function createUser(
  data: UserCreateRq
): Promise<ApiResponse<UserDetailRs>> {
const res = await fetch(`${USER_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  const responseBody = await res.json()
  console.log("Response Body:", JSON.stringify(responseBody, null, 2))
  return responseBody
}

export async function getUsersPaged(
  page = 1,
  limit = 10,
  search: string = ""
): Promise<ApiResponse<UsersRs>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });

  if(search.trim()) params.append("search", search.trim());

  const res = await fetch(`${USER_URL}/paginated?${params.toString()}`)
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Error al obtener usuarios: ${res.status} - ${errorText}`)
  }

  const data = await res.json()
  return data
}

export async function getProjectsByUserPaginated(
  userId: number,
  page = 1,
  limit = 10,
  search: string = ""
): Promise<ApiResponse<ProjectsRs>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search.trim()) {
    params.append("search", search.trim());
  }

  const url = `${USER_URL}/${userId}/projects?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al obtener proyectos del usuario ${userId}: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  return data;
}

export async function getUserById(
  id: number
): Promise<ApiResponse<UserItemRs>> {
  try {
    const res = await fetch(`${USER_URL}/${id}`)
    
    const responseData = await res.json()
    
    return responseData
    
  } catch (error) {
    console.error("Network/Parse error in getUserById:", error)
    return {
      status: "error",
      message: "Error de conexión. Verifica tu internet.",
      error: []
    }
  }
}

export async function deleteUser(
  id: number
): Promise<ApiResponse<UserDetailRs>> {
  const res = await fetch(`${USER_URL}/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Error al eliminar bus: ${errorText || res.status}`)
  }
  return res.json()
}