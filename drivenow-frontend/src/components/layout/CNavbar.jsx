import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

function CNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      {/* BRAND */}
      <Link
        className="navbar-brand d-flex align-items-center fw-bold"
        to="/customerdashboard"
      >
        <span className="fs-4 me-2">🚗</span>
        DriveNow
      </Link>

      {/* TOGGLER */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#customerNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* LINKS */}
      <div className="collapse navbar-collapse" id="customerNavbar">
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link fw-medium" to="/customerdashboard">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link fw-medium" to="/customerdashboard#vehicles">
              Vehicles
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link fw-medium" to="/mybookings">
              My Bookings
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link fw-medium" to="/customer/profile">
              Profile
            </Link>
          </li>
        </ul>

        {/* LOGOUT */}
        <div className="d-flex">
          <button
            className="btn btn-outline-danger"
            onClick={() => logout(navigate)}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default CNavbar;
