// src/components/auth/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/auth.css";

const roles = [
  { id: "customerRenter", label: "Customer - Rent vehicles" },
  { id: "vendor", label: "Vendor - List my vehicles" },
];

function SignupPage() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("customerRenter");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // UI role → Backend enum role
  const mapRoleToBackend = (role) => {
    if (role === "vendor") return "VENDOR";
    return "CUSTOMER";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/register", {
        fullName,
        email,
        password,
        mobileNumber,
        city,
        role: mapRoleToBackend(selectedRole),
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
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

        {error && <div className="alert alert-danger">{error}</div>}

        <form className="auth-form" onSubmit={handleSignup}>
          <label>
            Full name
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            Mobile Number
            <input
              type="tel"
              placeholder="9876543210"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </label>

          <label>
            City
            <input
              type="text"
              placeholder="Pune"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="btn btn-dark auth-btn"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
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
