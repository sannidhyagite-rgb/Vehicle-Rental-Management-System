// src/vendor/profile/ProfileSidebar.jsx

import React from "react";

function formatDateToDDMMYYYY(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export default function ProfileSidebar({ vendor }) {
  return (
    <div className="profile-card">
      <div className="avatar-circle">👤</div>
      <h3 className="vendor-name">{vendor.name}</h3>
      <p className="vendor-email">{vendor.email}</p>

      <div className="profile-stats">
        <div className="stat-row">
          <span className="stat-label">Joined since</span>
          <span className="stat-value">{formatDateToDDMMYYYY(vendor.joined)}</span>
        </div>

        <div className="stat-row">
          <span className="stat-label">Total vehicles</span>
          <span className="stat-value">{vendor.totalVehicles}</span>
        </div>

        <div className="stat-row">
          <span className="stat-label">Total earnings</span>
          <span className="stat-value">₹{vendor.totalEarnings.toLocaleString()}</span>
        </div>
      </div>

      <div className={`verification ${vendor.verified ? "verified" : "pending"}`}>
        {vendor.verified ? "Verified Vendor" : "Verification Pending"}
      </div>
    </div>
  );
}
