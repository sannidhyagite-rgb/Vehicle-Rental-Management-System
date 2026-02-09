// src/components/auth/LoginPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
// import api from "../../api"; // <-- MUST be this file

import "../../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= AUTO REDIRECT IF ADMIN ALREADY LOGGED IN ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "ADMIN") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  /* ================= HANDLE ADMIN LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Authenticate admin
      const loginRes = await api.post("/auth/login", {
        email,
        password,
      });

      const token = loginRes.data.token;
      localStorage.setItem("token", token);

      // 2️⃣ Fetch logged-in user
      const userRes = await api.get("/users/me");
      const user = userRes.data;

      // 🔒 HARD ADMIN CHECK
      if (user.role !== "ADMIN") {
        localStorage.removeItem("token");
        setError("Access denied. Admin credentials required.");
        return;
      }

      // 3️⃣ Store admin info
      localStorage.setItem("role", "ADMIN");
      localStorage.setItem("user", JSON.stringify(user));

      // 4️⃣ Redirect admin
      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      console.error(err);
      setError("Invalid admin email or password");
    } finally {
      setLoading(false);
      setLoading(false);

      // -------------------------
      // TEST LOGIN ACCOUNTS
      // -------------------------

      const mockCustomerEmails = ["customer@example.com"];
      const mockVendorEmails = ["vendor@example.com"];

      // YOUR NEW ADMIN LOGIN (REQUESTED BY YOU)
      const mockAdminEmails = ["superadmin@drivenow.com"];

      const userEmail = email.toLowerCase().trim();

      if (mockCustomerEmails.includes(userEmail)) {
        navigate("/customerdashboard");

      } else if (mockVendorEmails.includes(userEmail)) {
        navigate("/vendor/dashboard");

      } else if (mockAdminEmails.includes(userEmail)) {
        navigate("/admin/dashboard");

      } else {
        setError("Invalid email. Try customer@example.com or vendor@example.com or superadmin@drivenow.com");
      }
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Admin Login</h1>
        <p className="auth-subtitle">Authorized administrators only</p>

        {error && (
          <div className="alert alert-danger mb-3">{error}</div>
        )}

        <form className="auth-form" onSubmit={handleLogin}>
          <label>
            Admin Email
            <input
              type="email"
              placeholder="admin@yourdomain.com"
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

        <div className="mt-3 p-3 bg-light rounded">
          <small className="text-muted">
            <strong>Test Accounts:</strong><br />
            Customer: <code>customer@example.com</code><br />
            Vendor: <code>vendor@example.com</code><br />
            Admin: <code>superadmin@drivenow.com</code><br />
            <em>Any password works</em>
          </small>
        </div>

        <p className="auth-footer-text mt-4">
          Customer or Vendor? <Link to="/login-otp">Login with OTP</Link>
        </p>

        <p className="auth-footer-text mt-2">
          Don't have an account? <Link to="/signup">Register here</Link>
        </p>
      </div>
    </main>
  );
}
export default LoginPage;
