// src/components/auth/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    // 1. Login
    const loginRes = await api.post("/api/auth/login", {
      email,
      password,
    });

    const token = loginRes.data.token;
    localStorage.setItem("token", token);

    // 2. Get user profile
    const userRes = await api.get("/api/users/me");
    const user = userRes.data;

    // 3. Store user (optional but useful)
    localStorage.setItem("user", JSON.stringify(user));

    // 4. Role-based navigation
    if (user.role === "VENDOR") {
      navigate("/vendor/dashboard");
    } else if (user.role === "CUSTOMER") {
      navigate("/customerdashboard");
    } else if (user.role === "ADMIN") {
      navigate("/admin/dashboard");
    }

  } catch (err) {
    setError("Invalid email or password");
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Log in to continue</p>

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <form className="auth-form" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              placeholder="Enter email"
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

        <p className="auth-footer-text mt-4">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
