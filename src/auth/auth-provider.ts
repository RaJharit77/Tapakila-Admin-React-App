import { AuthProvider } from "react-admin";
import { API_URL } from "../api/api";

export const authProvider: AuthProvider = {
  checkAuth: async function (): Promise<void> {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Veuillez vous connecter");
    }

    const response = await fetch(`${API_URL}/api/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("accessToken");
      }

      throw new Error("Session invalide ou expirée");
    }
  },

  checkError: async function (error: unknown): Promise<void> {
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? error.status
        : undefined;

    if (status === 401 || status === 403) {
      localStorage.removeItem("accessToken");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  login: async function (params: { email: string; password: string }): Promise<void> {
    const { email, password } = params;

    const loginResult = await fetch(`${API_URL}/api/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (loginResult.status !== 200) {
      throw new Error("Erreur d’authentification");
    }

    const { accessToken } = await loginResult.json();

    localStorage.setItem("accessToken", accessToken);
  },

  logout: async function (): Promise<void | false | string> {
    localStorage.removeItem("accessToken");
    return Promise.resolve();
  },
};
