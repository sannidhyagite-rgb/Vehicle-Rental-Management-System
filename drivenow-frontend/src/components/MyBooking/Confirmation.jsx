import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Confirmation.css";
import carIcon from "../../assets/car.png";
import { getBookingById } from "../../api/bookingApi";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId } = location.state || {};
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      alert("No booking ID found. Returning to home.");
      navigate("/");
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await getBookingById(bookingId);
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, navigate]);

  if (loading) return (
    <div className="confirmation-wrapper" style={{ textAlign: "center", paddingTop: "50px" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading booking confirmation...</p>
    </div>
  );

  if (!booking) return (
    <div className="confirmation-wrapper" style={{ textAlign: "center", paddingTop: "50px" }}>
      <div className="alert alert-danger">
        <h4>Error Loading Booking</h4>
        <p>Could not retrieve booking details. Please checks your "My Bookings" page.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/mybookings")}>
          Go to My Bookings
        </button>
      </div>
    </div>
  );

  // Calculate days for display
  const startDate = new Date(booking.pickupDateTime);
  const endDate = new Date(booking.returnDateTime);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  return (
    <div className="confirmation-wrapper">

      {/* SUCCESS HEADER */}
      <div className="success-header">
        <div className="success-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p>Your vehicle reservation has been successfully created</p>
      </div>

      {/* BOOKING DETAILS */}
      <div className="card">
        <div className="card-header">
          <h3>Booking Details</h3>
          <span className="status">Confirmed</span>
        </div>

        <p className="meta">
          Confirmation Number: <strong>#{booking.bookingId}</strong> &nbsp; | &nbsp; Booked on {new Date().toLocaleDateString()}
        </p>

        <div className="details-grid">
          <div>
            <h4>Vehicle Information</h4>
            <img src={carIcon} alt="car" />
            <strong>{booking.vehicleName || "Vehicle"}</strong>
            <p>Vehicle ID: {booking.vehicleId}</p>
          </div>

          <div>
            <h4>Rental Details</h4>
            <p><strong>Pickup:</strong> {startDate.toLocaleString()}</p>
            <p><strong>Return:</strong> {endDate.toLocaleString()}</p>
            {/*  <p>
              <strong>Pickup & Return Location:</strong><br />
               FIXME: Backend DTO might not return full location details yet, or it handles it differently.
               Using data from vehicle if available or static fallback for now if not in DTO 
               {booking.location || "Location details provided at checkout"}
            </p> */}
          </div>
        </div>
      </div>

      {/* PAYMENT SUMMARY */}
      <div className="card">
        <h3>Payment Summary</h3>

        <div className="row">
          <span>Vehicle rental ({diffDays} days)</span>
          <span>₹{booking.totalAmount}</span>
        </div>
        <div className="row">
          <span>Insurance</span>
          <span>Included</span>
        </div>
        <div className="row">
          <span>Taxes & fees</span>
          <span>₹0.00</span>
        </div>

        <hr />

        <div className="row total">
          <span>Total Paid</span>
          <span>₹{booking.totalAmount}</span>
        </div>
        <div className="row">
          <small className="text-muted w-100 text-end">Payment verified via Razorpay</small>
        </div>
      </div>

      {/* IMPORTANT INFO */}
      <div className="card">
        <h3>Important Information</h3>

        <div className="details-grid">
          <div>
            <h4>What to Bring</h4>
            <ul>
              <li>Valid driver's license</li>
              <li>Credit card for security deposit</li>
              <li>Confirmation number</li>
              <li>Government-issued photo ID</li>
            </ul>
          </div>

          <div>
            <h4>Pickup Instructions</h4>
            <ul>
              <li>Arrive 15 minutes early</li>
              <li>Complete vehicle inspection</li>
              <li>Review rental agreement</li>
              <li>Contact: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="actions">
        <button
          className="primary"
          onClick={() => navigate("/mybookings")}
        >
          View All Bookings
        </button>
      </div>


      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <button className="outline" onClick={() => navigate("/")}>
          Back to Home
        </button>
        <button className="primary" onClick={() => navigate("/")}>
          Browse More Vehicles
        </button>
      </div>

    </div>
  );
};

export default Confirmation;
