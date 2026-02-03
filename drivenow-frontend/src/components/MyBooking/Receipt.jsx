import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Receipt.css";

const Receipt = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const booking = state?.booking;

    if (!booking) {
        return (
            <div className="receipt-error">
                <p>No booking details found.</p>
                <button onClick={() => navigate("/mybookings")}>Back to My Bookings</button>
            </div>
        );
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="receipt-container">
            <div className="receipt-card">
                {/* Header */}
                <div className="receipt-header">
                    <div className="brand">
                        <h1>DriveNow</h1>
                        <p className="tagline">Premium Car Rentals</p>
                    </div>
                    <div className="invoice-details">
                        <h2>INVOICE</h2>
                        <p><strong>Booking ID:</strong> #{booking.id}</p>
                        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span className="status-confirmed">{booking.status?.toUpperCase() || "CONFIRMED"}</span></p>
                    </div>
                </div>

                <hr />

                {/* Vehicle Info */}
                <div className="section">
                    <h3>Vehicle Details</h3>
                    <div className="row">
                        <div className="col">
                            <p className="label">Vehicle</p>
                            <p className="value">{booking.carName}</p>
                        </div>
                        <div className="col">
                            <p className="label">Type</p>
                            <p className="value">{booking.type || "Car"}</p>
                        </div>
                        <div className="col">
                            <p className="label">Rate</p>
                            <p className="value">₹{booking.ratePerDay}/day</p>
                        </div>
                    </div>
                </div>

                {/* Rental Period */}
                <div className="section">
                    <h3>Rental Period</h3>
                    <div className="row">
                        <div className="col">
                            <p className="label">Pickup</p>
                            <p className="value">{booking.pickupDate} at {booking.pickupTime}</p>
                        </div>
                        <div className="col">
                            <p className="label">Return</p>
                            <p className="value">{booking.returnDate} at {booking.returnTime}</p>
                        </div>
                        <div className="col">
                            <p className="label">Duration</p>
                            <p className="value">{booking.days} Day(s)</p>
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="section">
                    <h3>Location</h3>
                    <p className="value">{booking.location}</p>
                </div>

                <hr />

                {/* Payment Summary */}
                <div className="payment-summary">
                    <h3>Payment Summary</h3>
                    <div className="summary-row">
                        <span>Base Rate (₹{booking.ratePerDay} x {booking.days} days)</span>
                        <span>₹{booking.cost}</span>
                    </div>
                    <div className="summary-row">
                        <span>Taxes & Fees</span>
                        <span>Included</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total Amount Paid</span>
                        <span>₹{booking.cost}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="receipt-footer">
                    <p>Thank you for choosing DriveNow!</p>
                    <p className="contact">Support: support@drivenow.com | +91 98765 43210</p>
                </div>

                {/* Actions */}
                <div className="receipt-actions no-print">
                    <button className="btn-print" onClick={handlePrint}>🖨 Print / PDF</button>
                    <button className="btn-back" onClick={() => navigate("/mybookings")}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Receipt;
