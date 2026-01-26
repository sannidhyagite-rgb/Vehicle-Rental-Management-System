import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Token expired / invalid
      if (status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }

      // Forbidden (role mismatch)
      if (status === 403) {
        console.warn("Access denied: insufficient permissions");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
