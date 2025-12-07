import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Side */}
        <div className="footer-brand">
          <h2 className="footer-logo">DriveNow</h2>
          <p className="footer-text">
            Premium car rentals for all your travel needs.  
            Safe, affordable, and available anytime.
          </p>
        </div>

        {/* Center Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Vehicles</li>
            <li>My Bookings</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@drivenow.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Pune, Maharashtra</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DriveNow. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
