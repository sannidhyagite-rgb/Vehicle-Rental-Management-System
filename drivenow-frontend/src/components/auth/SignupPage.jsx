// src/components/auth/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

const roles = [
  { id: "customerRenter", label: "Customer - Rent vehicles" },
  { id: "vendor", label: "Vendor - List my vehicles" },
  // Removed Admin role as requested
];

function SignupPage() {
  const [selectedRole, setSelectedRole] = useState("customerRenter");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // You would add real signup logic and assign role here
    // After successful signup, redirect to login
    navigate("/login");
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="auth-subtitle">Fill in your details to get started</p>

        <div className="role-selector">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              className={
                "role-pill" +
                (selectedRole === role.id ? " role-pill-active" : "")
              }
              onClick={() => setSelectedRole(role.id)}
            >
              {role.label}
            </button>
          ))}
        </div>

        <form className="auth-form" onSubmit={handleSignup}>
          <label>
            Full name
            <input type="text" placeholder="John Doe" required />
          </label>

          <label>
            Email
            <input type="email" placeholder="you@example.com" required />
          </label>

          <label>
            Password
            <input type="password" placeholder="Create a password" required />
          </label>

          <button type="submit" className="btn btn-dark auth-btn">
            Create Account
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </main>
  );
}

export default SignupPage;
