// src/components/auth/LoginPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= AUTO REDIRECT IF LOGGED IN ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else if (role === "CUSTOMER") {
        navigate("/customerdashboard", { replace: true });
      } else if (role === "VENDOR") {
        navigate("/vendor/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  /* ================= HANDLE LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Admin login (email + password)
      const loginRes = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = loginRes.data.token;
      localStorage.setItem("token", token);

      // 2️⃣ Fetch logged-in user
      const userRes = await api.get("/api/users/me");
      const user = userRes.data;

      // 🔒 Admin-only guard
      if (user.role !== "ADMIN") {
        localStorage.removeItem("token");
        setError("Unauthorized access. Admins only.");
        return;
      }

      // 3️⃣ Store role (for ProtectedRoute + consistency)
      localStorage.setItem("role", user.role);

      // (Optional) store full user
      localStorage.setItem("user", JSON.stringify(user));

      // 4️⃣ Redirect admin
      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Admin Login</h1>
        <p className="auth-subtitle">Admins only</p>

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <form className="auth-form" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn-dark auth-btn w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 👇 Customer/Vendor redirect */}
        <p className="auth-footer-text mt-4">
          Customer or Vendor? <Link to="/login-otp">Login with OTP</Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
