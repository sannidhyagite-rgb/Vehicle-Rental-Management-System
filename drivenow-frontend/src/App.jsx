import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= SECURITY ================= */
import ProtectedRoute from "./routes/ProtectedRoute";

/* ================= LAYOUTS ================= */
import AdminLayout from "./layouts/AdminLayout";
import VendorLayout from "./layouts/VendorLayout";

/* ================= COMMON ================= */
import Navbar from "./components/layout/Navbar";
import CNavbar from "./components/layout/CNavbar";

/* ================= HOME ================= */
import Hero from "./components/layout/Hero";
import WhyChoose from "./components/home/WhyChoose";
import FeaturedVehicles from "./components/home/FeaturedVehicles";
import Footer from "./components/home/Footer";

/* ================= AUTH ================= */
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import LoginOtp from "./components/auth/LoginOtp";

/* ================= ADMIN ================= */
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import AdminUser from "./components/Admin/AdminUser/AdminUser";
import AdminNavbar from "./components/Admin/AdminNavbar/Navbar";
import AdminLicenseVerification from "./pages/admin/AdminLicenseVerification";
import AdminVehicles from "./pages/admin/vehicles/AdminVehicles";

/* ================= VENDOR ================= */
import VendorDashboard from "./vendor/dashboard/VendorDashboard";
import VendorNavbar from "./vendor/layout/VendorNavbar";
import VendorProfile from "./vendor/profile/VendorProfile";
import MyVehicles from "./vendor/vehicles/MyVehicles";
import AddVehicle from "./vendor/vehicles/AddVehicle";
import VendorEarnings from "./vendor/earnings/VendorEarnings";
import VendorNotifications from "./vendor/notifications/VendorNotifications";
import VendorRegister from "./pages/VendorRegister";

/* ================= CUSTOMER ================= */
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerProfile from "./pages/customer/CustomerProfile";
import MyBookings from "./components/MyBooking/MyBookings";
import BookingInfo from "./components/MyBooking/BookingInfo";
import Payment from "./components/MyBooking/Payment";
import Confirmation from "./components/MyBooking/Confirmation";
import Receipt from "./components/MyBooking/Receipt";
import VehicleDetails from "./pages/VehicleDetails";

/* ================= BOOKING FLOW ================= */
// Imported above in Customer section or handled in routes below

/* Security */
import ProtectedRoute from "./routes/ProtectedRoute";

/* ================= HOME PAGE ================= */
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChoose />
      <FeaturedVehicles />
      <Footer />
    </>
  );
}


/* ================= APP ================= */
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========== PUBLIC ========= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginOtp />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/login" element={<LoginPage />} />

        {/* ========== ADMIN ========= */}
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
          <Route
            path="license-verification"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminLicenseVerification />
              </ProtectedRoute>
            }
          />
          <Route
            path="vehicles"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminVehicles />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ========== VENDOR ========= */}
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

        {/* ========== CUSTOMER ========= */}
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
          path="/customer/profile"
          element={
            <ProtectedRoute role="CUSTOMER">
              <>
                <CNavbar />
                <CustomerProfile />
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

        {/* ========== BOOKING ========= */}
        <Route path="/booking-info" element={<BookingInfo />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />

        {/* ========== VENDOR REGISTER ========= */}
        <Route
          path="/vendor/register"
          element={
            <>
              <Navbar />
              <VendorRegister />
            </>
          }
        />

        {/* ================= FALLBACK ================= */}
        {/* Vehicle Details */}
        <Route
          path="/vehicle/:id"
          element={
            <>
              <CNavbar />
              <VehicleDetails />
            </>
          }
        />

        {/* Booking Flow */}
        <Route path="/booking-info" element={<BookingInfo />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/receipt" element={<Receipt />} />

        {/* 404 */}

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
