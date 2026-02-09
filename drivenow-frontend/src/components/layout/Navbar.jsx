// src/components/layout/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      {/* BRAND */}
      <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
        <span className="fs-4 me-2">🚗</span>
        DriveNow
      </Link>

      <nav className="navbar-center">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <a href="#vehicles" className="nav-link">
          Vehicles
        </a>

      </nav>
      <div className="navbar-right">
        <Link to="/login" className="btn btn-ghost">
          Login
        </Link>
        <Link to="/signup" className="btn btn-primary">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
