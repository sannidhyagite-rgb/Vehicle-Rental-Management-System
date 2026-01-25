import React from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import "./BookingInfo.css";
import carIcon from "../../assets/car.png";
const Payment = () => {
  const navigate = useNavigate();

  return (
    
    <div className="payment-wrapper">
         <div
        className="back-link"
        onClick={() => navigate(-1)}
      >
        ← Back to Vehicle Details
      </div>

      {/* STEPPER */}
      <div className="stepper">
        <div className="step done">
          <span>1</span> Booking Details
        </div>
        <div className="step active">
          <span>2</span> Payment
        </div>
        <div className="step">3 Confirmation</div>
      </div>

      <div className="payment-grid">

        {/* LEFT COLUMN */}
        <div className="left-col">

          {/* Payment Info */}
          <div className="card">
            <h3>Payment Information</h3>

            <label>Cardholder Name</label>
            <input placeholder="John Doe" />

            <label>Card Number</label>
            <input placeholder="1234 5678 9012 3456" />

            <div className="grid-2">
              <div>
                <label>Expiry Date</label>
                <input placeholder="MM/YY" />
              </div>
              <div>
                <label>CVV</label>
                <input placeholder="123" />
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="card">
            <h3>Billing Address</h3>

            <label>Address</label>
            <input placeholder="123 Main Street" />

            <div className="grid-2">
              <div>
                <label>City</label>
                <input placeholder="New York" />
              </div>
              <div>
                <label>ZIP Code</label>
                <input placeholder="10001" />
              </div>
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

      {/* BOTTOM BUTTONS */}
      <div className="payment-actions">
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>

        <button
          className="complete-btn"
          onClick={() => navigate("/confirmation")}
        >
          Complete Booking
        </button>
      </div>

    </div>
  );
};

export default Payment;
