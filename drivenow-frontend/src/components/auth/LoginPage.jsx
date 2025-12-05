// src/components/auth/LoginPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // prevent reload

    // For now just redirect (no validation)
    navigate("/");
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Log in to continue to RentEase</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <label>
            Email
            <input type="email" placeholder="you@example.com" required />
          </label>

          <label>
            Password
            <input type="password" placeholder="••••••••" required />
          </label>

          <button type="submit" className="btn btn-dark auth-btn">
            Login
          </button>
        </form>

        <p className="auth-footer-text">
          Don&apos;t have an account? <a href="/signup">Create one</a>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
