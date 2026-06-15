import { User } from "./user";

export interface AuthState {
  token: string | null;
  expiresIn: number | null;
  user: User | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: number;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}