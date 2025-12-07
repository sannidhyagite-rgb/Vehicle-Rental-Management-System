// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Admin/Layout";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import AdminUser from "./components/Admin/AdminUser/AdminUser"
import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import WhyChoose from "./components/home/WhyChoose";
import FeaturedVehicles from "./components/home/FeaturedVehicles";


import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";

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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<Layout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );    
}

export default App;
