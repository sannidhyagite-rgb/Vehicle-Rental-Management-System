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

      {/* TOGGLER */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#publicNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* LINKS */}
      <div className="collapse navbar-collapse" id="publicNavbar">
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link fw-medium" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <a className="nav-link fw-medium" href="#vehicles">
              Vehicles
            </a>
          </li>
        </ul>

        {/* AUTH BUTTONS */}
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-outline-primary">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
