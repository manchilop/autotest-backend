import { User } from "./user";

export interface AuthState {
  token: string | null;
  user: User | null;
}