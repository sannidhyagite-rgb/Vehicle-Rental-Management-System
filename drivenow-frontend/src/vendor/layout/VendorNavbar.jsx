// src/vendor/layout/VendorNavbar.jsx

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./vendor-navbar.css";

export default function VendorNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="vendor-navbar">
      <div className="vendor-nav-left">
        <div className="logo-icon">🚗</div>
        <span className="logo-text">DriveNow</span>
      </div>

      <nav className="vendor-nav-center">
        <NavLink to="/vendor/dashboard" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/vendor/vehicles" className="nav-link">
          My Vehicles
        </NavLink>
        <NavLink to="/vendor/earnings" className="nav-link">
          Earnings
        </NavLink>
        <NavLink to="/vendor/notifications" className="nav-link">
          Notifications
        </NavLink>
        
      </nav>

      <div className="vendor-nav-right">
        <NavLink to="/vendor/profile" className="profile">
          <span className="profile-icon">👤</span>
          <span className="profile-name">Atharv</span>
        </NavLink>
        <button className="btn btn-ghost" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
