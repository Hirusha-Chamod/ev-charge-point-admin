// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("")
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const [loading, setLoading] = useState(true);

  // === 1️⃣ Decode JWT to get user info ===
  const decodeJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  };

  // === 2️⃣ Refresh the access token if expired ===
  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return logout();

    try {
      const res = await axios.post(`${API_BASE}/auth/refresh`, {
        refreshToken,
      });
      const newAccessToken = res.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      setAccessToken(newAccessToken);

      const decoded = decodeJwt(newAccessToken);
      setUser(decoded);
      setIsAuthenticated(true);
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }
  }, [refreshToken]);

  // === 3️⃣ Automatically check token validity on load ===
  useEffect(() => {
    const initAuth = async () => {
      if (accessToken) {
        const decoded = decodeJwt(accessToken);
        const now = Date.now() / 1000;

        if (decoded?.exp && decoded.exp < now) {
          await refreshAccessToken(); // expired → try refresh
        } else {
          setUser(decoded);
          setIsAuthenticated(true);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [accessToken, refreshAccessToken]);

  // === 4️⃣ Handle login ===
  const login = async (email, password) => {
    setAuthError("")
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      const decoded = decodeJwt(accessToken);
      setUser(decoded);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      setAuthError("Invalid Credentials")
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // === 5️⃣ Handle logout ===
  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    authError,
    isAuthenticated,
    loading,
    login,
    logout,
    accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
