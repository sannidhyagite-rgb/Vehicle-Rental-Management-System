import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import AdminLayout from "./layouts/AdminLayout";
import VendorLayout from "./layouts/VendorLayout";

/* Common */
import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import WhyChoose from "./components/home/WhyChoose";
import FeaturedVehicles from "./components/home/FeaturedVehicles";
import CNavbar from "./components/layout/CNavbar";

/* Auth */
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";

/* Admin */
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import AdminUser from "./components/Admin/AdminUser/AdminUser";

/* Vendor */
import VendorDashboard from "./vendor/dashboard/VendorDashboard";
import VendorProfile from "./vendor/profile/VendorProfile";
import MyVehicles from "./vendor/vehicles/MyVehicles";
import AddVehicle from "./vendor/vehicles/AddVehicle";
import VendorEarnings from "./vendor/earnings/VendorEarnings";
import VendorNotifications from "./vendor/notifications/VendorNotifications";

/* Customer */
import CustomerDashboard from "./pages/CustomerDashboard";
import MyBookings from "./components/MyBooking/MyBookings";
import VehicleDetails from "./pages/VehicleDetails";
import VendorRegister from "./pages/VendorRegister";

/* Security */
import ProtectedRoute from "./routes/ProtectedRoute";

/* Home */
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

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminUser />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Vendor */}
        <Route path="/vendor" element={<VendorLayout />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute role="VENDOR">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute role="VENDOR">
                <VendorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="vehicles"
            element={
              <ProtectedRoute role="VENDOR">
                <MyVehicles />
              </ProtectedRoute>
            }
          />
          <Route
            path="vehicles/new"
            element={
              <ProtectedRoute role="VENDOR">
                <AddVehicle />
              </ProtectedRoute>
            }
          />
          <Route
            path="earnings"
            element={
              <ProtectedRoute role="VENDOR">
                <VendorEarnings />
              </ProtectedRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute role="VENDOR">
                <VendorNotifications />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Customer */}
        <Route
          path="/customerdashboard"
          element={
            <ProtectedRoute role="CUSTOMER">
              <>
                <CNavbar />
                <CustomerDashboard />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mybookings"
          element={
            <ProtectedRoute role="CUSTOMER">
              <>
                <CNavbar />
                <MyBookings />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicle/:id"
          element={
            <>
              <CNavbar />
              <VehicleDetails />
            </>
          }
        />

        <Route
          path="/vendor/register"
          element={
            <>
              <Navbar />
              <VendorRegister />
            </>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
