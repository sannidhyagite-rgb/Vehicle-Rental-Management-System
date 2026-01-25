import React from "react";
import { useNavigate } from "react-router-dom";
import "./Confirmation.css";
import carIcon from "../../assets/car.png";

const Confirmation = () => {
  const navigate = useNavigate();

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
          Confirmation Number: • • • &nbsp; | &nbsp; Booked on 1/21/2026
        </p>

        <div className="details-grid">
          <div>
            <h4>Vehicle Information</h4>
            <img src={carIcon} alt="car" />
            <strong>BMW X5</strong>
            <p>Vehicle ID: 1</p>
          </div>

          <div>
            <h4>Rental Details</h4>
            <p><strong>Pickup:</strong> Invalid Date</p>
            <p><strong>Return:</strong> Invalid Date</p>
            <p>
              <strong>Pickup & Return Location:</strong><br />
              Downtown<br />
              123 Main St, Downtown, NY 10001
            </p>
          </div>
        </div>
      </div>

      {/* PAYMENT SUMMARY */}
      <div className="card">
        <h3>Payment Summary</h3>

        <div className="row">
          <span>Vehicle rental (3 days)</span>
          <span>$267.00</span>
        </div>
        <div className="row">
          <span>Insurance</span>
          <span>Included</span>
        </div>
        <div className="row">
          <span>Taxes & fees</span>
          <span>$24.30</span>
        </div>

        <hr />

        <div className="row total">
          <span>Total Paid</span>
          <span>$0.00</span>
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

      {/* WHAT'S NEXT */}
      <div className="card">
        <h3>What's Next?</h3>

        <div className="next-step active">
          <span>1</span>
          <div>
            <strong>Confirmation Email Sent</strong>
            <p>Check your email for detailed booking information</p>
          </div>
        </div>

        <div className="next-step">
          <span>2</span>
          <div>
            <strong>Pickup Reminder</strong>
            <p>You'll receive a reminder 24 hours before pickup</p>
          </div>
        </div>

        <div className="next-step">
          <span>3</span>
          <div>
            <strong>Vehicle Pickup</strong>
            <p>Complete your rental at the pickup location</p>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <button className="outline" onClick={() => navigate("/")}>
          Back to Home
        </button>
        <button className="primary" onClick={() => navigate("/vehicles")}>
          Browse More Vehicles
        </button>
      </div>

    </div>
  );
};

export default Confirmation;
