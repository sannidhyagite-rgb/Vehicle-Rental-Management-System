// src/components/auth/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // -------------------------
    // 🎯 TEST LOGIN ACCOUNTS
    // -------------------------

    const mockCustomerEmails = ["customer@example.com"];
    const mockVendorEmails   = ["vendor@example.com"];

    // ⭐ YOUR NEW ADMIN LOGIN (REQUESTED BY YOU)
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
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Log in to continue</p>

        {error && (
          <div className="alert alert-danger mb-3">{error}</div>
        )}

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

          <button type="submit" className="btn btn-dark auth-btn w-100">
            Login
          </button>
        </form>

        <div className="mt-3 p-3 bg-light rounded">
          <small className="text-muted">
            <strong>Test Accounts:</strong><br/>
            Customer: <code>customer@example.com</code><br/>
            Vendor: <code>vendor@example.com</code><br/>
            Admin: <code>superadmin@drivenow.com</code><br/>
            <em>Any password works</em>
          </small>
        </div>

        <p className="auth-footer-text mt-4">
          Don't have an account? <a href="/signup">Create one</a>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
