import React from "react";
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

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">🚗 DriveNow</div>

      {/* Navigation Links */}
      <ul className="nav-menu">
        <div className="navlist">
          <NavLink
            to="/admin/dashboard"
            style={linkStyle}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            style={linkStyle}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/license-verification"
            style={linkStyle}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            License Verification
          </NavLink>

          <NavLink
            to="/admin/vehicles"
            style={linkStyle}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Vehicles
          </NavLink>

          <NavLink
            to="/admin/bookings"
            style={linkStyle}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Bookings
          </NavLink>

          <NavLink
            to="/admin/reports"
            style={linkStyle}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Reports
          </NavLink>

          <NavLink
            to="/admin/complaints"
            style={linkStyle}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Complaints
          </NavLink>
        </div>
      </ul>

      {/* Profile Section */}
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
