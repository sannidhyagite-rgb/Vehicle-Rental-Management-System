import React from 'react'
import "./AdminDashboard.css";
import { FaUsers, FaCar, FaCalendarAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoChatbubbles } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";

function AdminDashboard() {
  return (
    <div className="dashboard">

      {/* Title */}
      <div className="header">
        <h1>Admin Dashboard</h1>
        <p className="sub">Manage your vehicle rental platform</p>
      </div>

      {/* Stats */}
      <div className="stats-section">

        <div className="stat-card">
          <div>
            <p className="label">Total Users</p>
            <h2>2,547</h2>
            <span className="growth">▲ +12% from last month</span>
          </div>
          <FaUsers className="icon blue" />
        </div>

        <div className="stat-card">
          <div>
            <p className="label">Active Vehicles</p>
            <h2>847</h2>
            <span className="growth">▲ +8% from last month</span>
          </div>
          <FaCar className="icon green" />
        </div>

        <div className="stat-card">
          <div>
            <p className="label">Monthly Revenue</p>
            <h2>₹127,450</h2>
            <span className="growth">▲ +15% from last month</span>
          </div>
          <MdAttachMoney className="icon yellow" />
        </div>

        <div className="stat-card">
          <div>
            <p className="label">Active Bookings</p>
            <h2>189</h2>
            <span className="growth">▲ +5% from last month</span>
          </div>
          <FaCalendarAlt className="icon purple" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="qa-container">
        <h3 className="qa-title">Quick Actions</h3>

        <div className="quick-actions">
          <button className="qa-btn"><FaUsers /> Manage Users</button>
          <button className="qa-btn"><FaCar /> Vehicles</button>
          <button className="qa-btn"><FaCalendarAlt /> Bookings</button>
          <button className="qa-btn"><HiOutlineDocumentReport /> Reports</button>
          <button className="qa-btn"><IoChatbubbles /> Complaints</button>
          <button className="qa-btn"><IoIosSettings /> Settings</button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
