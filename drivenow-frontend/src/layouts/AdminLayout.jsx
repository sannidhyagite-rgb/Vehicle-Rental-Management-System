import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Admin/AdminNavbar/Navbar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Admin Pages */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
