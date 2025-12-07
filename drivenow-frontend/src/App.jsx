// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import VendorDashboard from "./pages/VendorDashboard";

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
        {/* Public landing page */}
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

{/* Auth pages */}
<Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<SignupPage />} />

{/* Customer Dashboard */}
<Route
  path="/customerdashboard"
  element={
    <>
      <CNavbar />
      <CustomerDashboard />
    </>
  }
/>

{/* Vendor Register Page */}
<Route
  path="/vendor/register"
  element={
    <>
      <Navbar />
      <VendorRegister />
    </>
  }
/>

{/* Vehicle Details Page */}
<Route
  path="/vehicle/:id"
  element={
    <>
      <CNavbar />
      <VehicleDetails />
    </>
  }
/>

{/* Vendor Dashboard */}
<Route
  path="/vendor/dashboard"
  element={
    <>
      <CNavbar />
      <VendorDashboard />
    </>
  }
/>

<Route path="/mybookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
