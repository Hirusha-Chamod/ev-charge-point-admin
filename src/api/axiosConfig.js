import axios from "axios";

const API_BASE_URL = "http://localhost:5014/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject({
        message: "Network error. Please check your connection.",
        originalError: error,
      });
    }

    // Handle 401 Unauthorized
    if (error.response.status === 401) {
      localStorage.removeItem("authToken");

      // Avoid redirect loop - only redirect if not already on login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // Handle 403 Forbidden
    if (error.response.status === 403) {
      console.error("Access forbidden");
    }

    // Handle 500 Server Error
    if (error.response.status >= 500) {
      console.error("Server error:", error.response.data);
    }

    // Return a structured error object
    return Promise.reject({
      status: error.response.status,
      message: error.response.data?.message || error.message,
      data: error.response.data,
      originalError: error,
    });
  }
);

export default axiosInstance;
