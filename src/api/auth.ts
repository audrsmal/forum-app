import { api } from "./axios";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  message: string;
  token: string;
  expiresIn?: string;
  user: AuthUser;
};

export async function loginApi(email: string, password: string) {
  const res = await api.post<AuthResponse>("/users/login", { email, password });
  return res.data;
}

export async function registerApi(name: string, email: string, password: string) {
  const res = await api.post<AuthResponse>("/users/register", { name, email, password });
  return res.data;
}
