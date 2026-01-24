import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

function CNavbar() {
  const navigate = useNavigate();

 

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo-icon">🚗</div>
        <span className="logo-text">DriveNow</span>
      </div>

      <nav className="navbar-center">
        <Link to="/customerdashboard" className="nav-link">
          Home
        </Link>

        <Link to="/customerdashboard#vehicles" className="nav-link">
          Vehicles
        </Link>

        <Link to="/mybookings" className="nav-link">
          My Bookings
        </Link>

        
        <Link to="/customer/profile">Profile</Link>

      </nav>

      <div className="navbar-right">
        <button className="btn btn-danger" onClick={() => logout(navigate)}>
         Logout
        </button>
      </div>
    </header>
  );
}

export default CNavbar;
