import { Outlet } from "react-router-dom";
import VendorNavbar from "../vendor/layout/VendorNavbar";
import React from "react";

function VendorLayout() {
  return (
    <>
      <VendorNavbar />
      {/* Push content below fixed navbar */}
      <main style={{ marginTop: "80px" }}>
        <Outlet />
      </main>
    </>
  );
}

export default VendorLayout;
