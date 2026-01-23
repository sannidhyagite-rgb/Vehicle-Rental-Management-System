import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookingInfo.css";
import carIcon from "../../assets/car.png";

const BookingInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="booking-wrapper">

      {/* BACK LINK – EXACT FIX */}
      <div
        className="back-link"
        onClick={() => navigate(-1)}
      >
        ← Back to Vehicle Details
      </div>

      {/* STEPPER */}
      <div className="stepper">
        <div className="step active">
          <span>1</span> Booking Details
        </div>
        <div className="step">2 Payment</div>
        <div className="step">3 Confirmation</div>
      </div>

      <div className="content-grid">

        {/* LEFT COLUMN */}
        <div className="left-col">

          {/* Rental Period */}
          <div className="card">
            <h3>Rental Period</h3>

            <div className="grid-2">
              <div>
                <label>Pickup Date</label>
                <input placeholder="mm/dd/yyyy" />
              </div>
              <div>
                <label>Pickup Time</label>
                <select><option>Select time</option></select>
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label>Return Date</label>
                <input placeholder="mm/dd/yyyy" />
              </div>
              <div>
                <label>Return Time</label>
                <select><option>Select time</option></select>
              </div>
            </div>
          </div>

          {/* Pickup & Return Locations */}
          <div className="card">
            <h3>Pickup & Return Locations</h3>

            <div className="grid-2">
              <div>
                <label>Pickup Location</label>
                <select><option>Downtown Location</option></select>
                <p className="sub">123 Main St, Downtown</p>
              </div>

              <div>
                <label>Return Location</label>
                <select><option>Downtown Location</option></select>
                <p className="sub">123 Main St, Downtown</p>
              </div>
            </div>
          </div>

          {/* Driver Info */}
          <div className="card">
            <h3>Driver Information</h3>

            <div className="grid-2">
              <div>
                <label>Driver Age</label>
                <input value="25" />
              </div>
              <div>
                <label>Additional Drivers</label>
                <select><option>None</option></select>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="card">
            <h3>Additional Options</h3>

            <div className="addon-row">
              <input type="checkbox" />
              <span>GPS Navigation</span>
              <span className="price">+$5/day</span>
            </div>

            <div className="addon-row">
              <input type="checkbox" />
              <span>Child Safety Seat</span>
              <span className="price">+$8/day</span>
            </div>

            <div className="addon-row">
              <input type="checkbox" />
              <span>Premium Insurance</span>
              <span className="price">+$15/day</span>
            </div>

            <div className="addon-row">
              <input type="checkbox" />
              <span>WiFi Hotspot</span>
              <span className="price">+$6/day</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="right-col">
          <div className="summary-card">
            <h3>Booking Summary</h3>
            <img src={carIcon} alt="car" />
            <h4>BMW X5</h4>
            <p>SUV</p>
            <div className="insurance">
              ✔ Comprehensive insurance included
            </div>
          </div>
        </div>

      </div>

      {/* STICKY BUTTON */}
      <div className="bottom-bar">
       <button onClick={() => navigate("/payment")}>
  Continue to Payment
</button>

      </div>
    </div>
  );
};

export default BookingInfo;
