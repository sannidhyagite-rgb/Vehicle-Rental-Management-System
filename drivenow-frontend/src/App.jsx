// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import WhyChoose from "./components/home/WhyChoose";
import FeaturedVehicles from "./components/home/FeaturedVehicles";

import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";

/* Vendor pages */
import VendorNavbar from "./vendor/layout/VendorNavbar";
import VendorProfile from "./vendor/profile/VendorProfile";
import VendorDashboard from "./vendor/dashboard/VendorDashboard";
import MyVehicles from "./vendor/vehicles/MyVehicles";
import AddVehicle from "./vendor/vehicles/AddVehicle";
import VendorEarnings from "./vendor/earnings/VendorEarnings";
import VendorNotifications from "./vendor/notifications/VendorNotifications";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChoose />
      <FeaturedVehicles />
    </>
  );
}

function VendorShell({ element: Element }) {
  // Wrapper to show vendor navbar and the page
  return (
    <>
      <VendorNavbar />
      <Element />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* vendor routes */}
        <Route path="/vendor/profile" element={<VendorShell element={VendorProfile} />} />
        <Route path="/vendor/dashboard" element={<VendorShell element={VendorDashboard} />} />
        <Route path="/vendor/vehicles" element={<VendorShell element={MyVehicles} />} />
        <Route path="/vendor/vehicles/new" element={<VendorShell element={AddVehicle} />} />
        <Route path="/vendor/earnings" element={<VendorShell element={VendorEarnings} />} />
        <Route path="/vendor/notifications" element={<VendorShell element={VendorNotifications} />} />

        {/* catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
