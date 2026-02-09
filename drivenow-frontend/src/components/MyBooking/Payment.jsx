import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder, verifyPayment } from "../../api/paymentApi";
import { updateBooking } from "../../api/bookingApi";
import "./Payment.css";
import "./BookingInfo.css";
import carIcon from "../../assets/car.png";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId, amount, vehicleModel, newTotalAmount, isUpdate } = location.state || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookingId) {
      alert("No booking details found. Returning to home.");
      navigate("/");
    }
  }, [bookingId, navigate]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      setLoading(true);

      // 1. Create Order
      const orderData = await createOrder(amount); // Returns { orderId, amount, currency }

      const options = {
        key: "rzp_test_S8TCRpe3iDXy0l", // Using the key user provided in properties (should ideally be env var)
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: "DriveNow",
        description: `Payment for Booking #${bookingId}`,
        image: carIcon,
        order_id: orderData.data.orderId,
        handler: async function (response) {
          try {
            // 2. Verify Payment
            const data = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: bookingId
            };

            await verifyPayment(data);

            // 3. If Update Mode, call updateBooking API now
            if (location.state?.isUpdate && location.state?.newBookingDates) {
              const { newBookingDates } = location.state;
              // updateBooking requires BookingModifyDTO structure.
              // Assuming it needs bookingId + dates.
              await updateBooking(bookingId, {
                bookingId: bookingId,
                pickupDateTime: newBookingDates.pickupDateTime,
                returnDateTime: newBookingDates.returnDateTime
              });
              alert("Payment Successful & Booking Updated!");
            } else {
              alert("Payment Successful!");
            }

            navigate("/confirmation", { state: { bookingId } }); // Navigate to confirmation page
          } catch (err) {
            console.error("Payment verification or Booking update failed", err);
            alert("Payment verified but booking update failed? Please contact support.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(false);

    } catch (err) {
      console.error("Error creating order", err);
      alert("Error initiating payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="payment-wrapper">
      <div className="back-link" onClick={() => navigate(-1)}>
        ← Back to Details
      </div>

      <div className="stepper">
        <div className="step done"><span>1</span> Booking Details</div>
        <div className="step active"><span>2</span> Payment</div>
        <div className="step">3 Confirmation</div>
      </div>

      <div className="payment-grid">
        <div className="left-col">
          <div className="card">
            <h3>{location.state?.isUpdate ? "Modify Booking Payment" : "Payment Required"}</h3>
            <p>{location.state?.isUpdate ? "Pay the difference to update your booking." : "Please complete the payment to confirm your booking."}</p>
            <div className="payment-summary">
              <div className="row">
                <span>Booking ID:</span>
                <span>#{bookingId}</span>
              </div>
              <div className="row">
                <span>Amount to Pay:</span>
                <span className="price">₹{amount}</span>
              </div>
            </div>

            <button
              className="complete-btn"
              onClick={handlePayment}
              disabled={loading}
              style={{ marginTop: '20px', width: '100%' }}
            >
              {loading ? "Processing..." : "Pay with Razorpay"}
            </button>
          </div>
        </div>

        <div className="right-col">
          <div className="summary-card">
            <h3>Booking Summary</h3>
            <img src={carIcon} alt="car" />
            <h4>{vehicleModel || "Vehicle"}</h4>

            {isUpdate ? (
              <>
                <p className="mb-1"><strong>Payable Amount: ₹{amount}</strong></p>
                <p className="text-muted small">New Total Booking Cost: ₹{newTotalAmount}</p>
              </>
            ) : (
              <p>Total: ₹{amount}</p>
            )}

            <div className="insurance">
              ✔ Comprehensive insurance included
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
