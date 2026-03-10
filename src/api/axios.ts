import axios from "axios";
import { clearAuthSession, getToken, isSessionExpired } from "../utils/auth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getToken();

    if (token && isSessionExpired()) {
      clearAuthSession();

      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        window.location.href = "/login";
      }

      return Promise.reject(new Error("Session expired"));
    }

    if (token) {
      config.headers.authorization = token;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      if (error?.response?.status === 401) {
        clearAuthSession();

        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register"
        ) {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);
