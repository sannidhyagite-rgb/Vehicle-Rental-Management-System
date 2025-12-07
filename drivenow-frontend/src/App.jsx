// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import WhyChoose from "./components/home/WhyChoose";
import FeaturedVehicles from "./components/home/FeaturedVehicles";

import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";

import CustomerDashboard from "./pages/CustomerDashboard";
import VendorRegister from "./pages/VendorRegister";
import VehicleDetails from "./pages/VehicleDetails";
import CNavbar from "./components/layout/CNavbar";
import VendorDashboard from "./pages/VendorDashboard";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<Home />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
