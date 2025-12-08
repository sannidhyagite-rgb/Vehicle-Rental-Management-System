// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import AdminUser from "./components/Admin/AdminUser/AdminUser";
import AdminNavbar from "./components/Admin/AdminNavbar/Navbar";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import WhyChoose from "./components/home/WhyChoose";
import FeaturedVehicles from "./components/home/FeaturedVehicles";

import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import MyBookings from "./components/MyBooking/MyBookings";

import CustomerDashboard from "./pages/CustomerDashboard";
import VendorRegister from "./pages/VendorRegister";
import VehicleDetails from "./pages/VehicleDetails";
import CNavbar from "./components/layout/CNavbar";

// Vendor pages
import VendorNavbar from "./vendor/layout/VendorNavbar";
import VendorProfile from "./vendor/profile/VendorProfile";
import MyVehicles from "./vendor/vehicles/MyVehicles";
import AddVehicle from "./vendor/vehicles/AddVehicle";
import VendorEarnings from "./vendor/earnings/VendorEarnings";
import VendorNotifications from "./vendor/notifications/VendorNotifications";
import VendorDashboard from "./vendor/dashboard/VendorDashboard"; // ← IMPORTANT!!

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

function AdminShell({ element: Element }) {
  return (
    <>
      <AdminNavbar />
      <Element />
    </>
  );
}

function VendorShell({ element: Element }) {
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

        {/* Landing */}
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminShell element={AdminDashboard} />} />
        <Route path="/admin/users" element={<AdminShell element={AdminUser} />} />

        {/* Vendor */}
        <Route path="/vendor/dashboard" element={<VendorShell element={VendorDashboard} />} />
        <Route path="/vendor/profile" element={<VendorShell element={VendorProfile} />} />
        <Route path="/vendor/vehicles" element={<VendorShell element={MyVehicles} />} />
        <Route path="/vendor/vehicles/new" element={<VendorShell element={AddVehicle} />} />
        <Route path="/vendor/earnings" element={<VendorShell element={VendorEarnings} />} />
        <Route path="/vendor/notifications" element={<VendorShell element={VendorNotifications} />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Customer */}
        <Route path="/customerdashboard" element={<><CNavbar /><CustomerDashboard /></>} />

        {/* Vendor Register */}
        <Route path="/vendor/register" element={<><Navbar /><VendorRegister /></>} />

        {/* Vehicle Details */}
        <Route path="/vehicle/:id" element={<><CNavbar /><VehicleDetails /></>} />

        {/* My Bookings */}
        <Route path="/mybookings" element={<><CNavbar /><MyBookings /></>} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
