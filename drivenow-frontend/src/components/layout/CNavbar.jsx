import React from "react";
import { Link, useNavigate } from "react-router-dom";

function CNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove login status
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo-icon">🚗</div>
        <span className="logo-text">DriveNow</span>
      </div>

      <nav className="navbar-center">
        <Link to="/" className="nav-link">Home</Link>
        <a href="#vehicles" className="nav-link">Vehicles</a>
        <Link to="/my-bookings" className="nav-link">My Bookings</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
      </nav>

      <div className="navbar-right">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default CNavbar;
