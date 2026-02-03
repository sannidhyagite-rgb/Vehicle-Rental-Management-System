import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import AdminLayout from "./layouts/AdminLayout";
import VendorLayout from "./layouts/VendorLayout";

/* Common */
import Navbar from "./components/layout/Navbar";
import CNavbar from "./components/layout/CNavbar";
import Hero from "./components/layout/Hero";
import WhyChoose from "./components/home/WhyChoose";
import FeaturedVehicles from "./components/home/FeaturedVehicles";
import Footer from "./components/home/Footer";

/* Auth */
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import LoginOtp from "./components/auth/LoginOtp";

/* Admin */
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import AdminUser from "./components/Admin/AdminUser/AdminUser";
import AdminNavbar from "./components/Admin/AdminNavbar/Navbar";
import AdminLicenseVerification from "./pages/admin/AdminLicenseVerification";
import AdminVehicles from "./pages/admin/vehicles/AdminVehicles";

/* Vendor */
import VendorNavbar from "./vendor/layout/VendorNavbar";
import VendorProfile from "./vendor/profile/VendorProfile";
import MyVehicles from "./vendor/vehicles/MyVehicles";
import AddVehicle from "./vendor/vehicles/AddVehicle";
import VendorEarnings from "./vendor/earnings/VendorEarnings";
import VendorNotifications from "./vendor/notifications/VendorNotifications";
import VendorDashboard from "./vendor/dashboard/VendorDashboard";

/* Customer */
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerProfile from "./pages/customer/CustomerProfile";
import MyBookings from "./components/MyBooking/MyBookings";
import BookingInfo from "./components/MyBooking/BookingInfo";
import Payment from "./components/MyBooking/Payment";
import Confirmation from "./components/MyBooking/Confirmation";
import Receipt from "./components/MyBooking/Receipt";
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
      <Footer />
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

/* ================= APP ================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<LoginPage />} />

        <Route path="/login" element={<LoginOtp />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* ================= ADMIN ================= */}
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

        {/* ================= VENDOR ================= */}
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

        {/* ================= CUSTOMER ================= */}
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

        {/* ================= VENDOR REGISTER ================= */}
        {/* Landing */}
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={<AdminShell element={AdminDashboard} />}
        />
        <Route
          path="/admin/users"
          element={<AdminShell element={AdminUser} />}
        />

        {/* Vendor */}
        <Route
          path="/vendor/dashboard"
          element={<VendorShell element={VendorDashboard} />}
        />
        <Route
          path="/vendor/profile"
          element={<VendorShell element={VendorProfile} />}
        />
        <Route
          path="/vendor/vehicles"
          element={<VendorShell element={MyVehicles} />}
        />
        <Route
          path="/vendor/vehicles/new"
          element={<VendorShell element={AddVehicle} />}
        />
        <Route
          path="/vendor/earnings"
          element={<VendorShell element={VendorEarnings} />}
        />
        <Route
          path="/vendor/notifications"
          element={<VendorShell element={VendorNotifications} />}
        />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Customer */}
        <Route
          path="/customerdashboard"
          element={
            <>
              <CNavbar />
              <CustomerDashboard />
            </>
          }
        />
        <Route
          path="/mybookings"
          element={
            <>
              <CNavbar />
              <MyBookings />
            </>
          }
        />

        {/* Vendor Register */}
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
