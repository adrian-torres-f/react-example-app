export interface UsersRs {
  users: UserItemRs[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface UserItemRs {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  projects: number;
}

export interface UserDetailRs {
  id: number;
  name: string;
  email: string;
}