export type UserRole = "STUDENT" | "TEACHER";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}