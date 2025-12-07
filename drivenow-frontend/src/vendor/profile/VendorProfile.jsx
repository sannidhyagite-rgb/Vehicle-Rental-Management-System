// src/vendor/profile/VendorProfile.jsx

import React from "react";
import "./vendor-profile.css";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import data from "./profile-data.json";

export default function VendorProfile() {
  // single vendor object (dummy)
  const vendor = data.vendor;

  return (
    <div className="vendor-page-shell">
      <div className="vendor-container">
        <div className="page-header">
          <div>
            <h1>My Profile</h1>
            <p className="subtitle">Manage your account settings and preferences</p>
          </div>
        </div>

        <div className="profile-grid">
          <aside className="profile-left">
            <ProfileSidebar vendor={vendor} />
          </aside>

          <section className="profile-right">
            <ProfileTabs vendor={vendor} data={data} />
          </section>
        </div>
      </div>
    </div>
  );
}
