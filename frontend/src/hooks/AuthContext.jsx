import React, { createContext, useContext, useEffect, useState } from "react";
import api, {
  loadTokenFromStorage,
  clearToken as clearTokenFromClient,
  setToken as setTokenInClient,
} from "../api/client.js";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function init() {
      try {
        const token = loadTokenFromStorage();
        if (!token) {
          if (active) {
            setUser(null);
            setLoading(false);
          }
          return;
        }

        const me = await api.me();
        if (active) setUser(me);
      } catch (error) {
        console.error("Failed to fetch user on init:", error);
        clearTokenFromClient();
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    init();

    return () => {
      active = false;
    };
  }, []);

  async function login(credentials) {
    try {
      const res = await api.login(credentials);
      if (res.token) setTokenInClient(res.token);
      if (res.user) {
        setUser(res.user);
      } else {
        // Fallback to fetch current user if not included in response
        const me = await api.me();
        setUser(me);
      }
      return res;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async function register(payload) {
    try {
      const res = await api.register(payload);
      if (res.token) setTokenInClient(res.token);
      if (res.user) {
        setUser(res.user);
      } else {
        // Fallback to fetch current user if not included in response
        const me = await api.me();
        setUser(me);
      }
      return res;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  function logout() {
    try {
      api.logout().catch(() => {});
    } catch {}
    clearTokenFromClient();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
