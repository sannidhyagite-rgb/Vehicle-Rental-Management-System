// src/components/layout/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo-icon">🚗</div>
        <span className="logo-text">DriveNow</span>
      </div>

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
    </header>
  );
}

export default Navbar;
