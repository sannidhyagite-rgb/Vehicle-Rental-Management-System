// src/components/auth/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ Add error state

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // ✅ THESE EXACT EMAILS WORK:
    const mockCustomerEmails = [
      "customer@example.com",
      "john@example.com",
      "customer@gmail.com"
    ];
    
    const mockVendorEmails = [
      "vendor@example.com", 
      "johnvendor@gmail.com",
      "vendor@auto.com"
    ];

    // Case-insensitive check
    const userEmail = email.toLowerCase().trim();

    if (mockCustomerEmails.includes(userEmail)) {
      console.log("✅ Customer login successful!");
      navigate("/customerdashboard");
    } else if (mockVendorEmails.includes(userEmail)) {
      console.log("✅ Vendor login successful!");
      navigate("/vendor/dashboard");
    } else {
      setError("Invalid email. Try: customer@example.com or vendor@example.com");
      console.log("❌ Invalid login:", userEmail);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Log in to continue to RentEase</p>

        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              placeholder="customer@example.com"
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
