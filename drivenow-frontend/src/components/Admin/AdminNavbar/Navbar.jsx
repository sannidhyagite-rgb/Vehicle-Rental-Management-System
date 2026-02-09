import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔐 Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/admin/login", { replace: true });
  };

  const styles = {
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  };

  return (
    <nav className="navbar">
      <div className="logo">🚗 DriveNow</div>

      <ul className="nav-menu">
        <div className="navlist">

          <NavLink
            to="/admin/dashboard"
            style={styles.link}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            style={styles.link}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/license-verification"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            License Verification
          </NavLink>

          {/* 🔥 NEW: Vehicles (Approve / Reject) */}
          <NavLink
            to="/admin/vehicles"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Vehicles
          </NavLink>

          <NavLink
            to="/admin/bookings"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Bookings
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Reports
          </NavLink>

          <NavLink
            to="/admin/complaints"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Complaints
          </NavLink>
        </div>
      </ul>

      <div className="profile-section">
        <span>👤 Admin</span>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;

