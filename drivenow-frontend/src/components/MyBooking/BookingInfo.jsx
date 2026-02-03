import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingInfo.css";
import carIcon from "../../assets/car.png";

import { createBooking, updateBooking, getBookingById } from "../../api/bookingApi";

const BookingInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    vehicleId,
    vehicleModel,
    ratePerDay = 0, // Default to 0 if not provided
    vehicleLocation,
    bookingId, // Present if editing
    existingPickupDate,
    existingPickupTime,
    existingReturnDate,
    existingReturnTime,
    currentCost = 0 // Existing paid amount
  } = location.state || {};

  console.log("BOOKING INFO STATE:", location.state);
  console.log("Current Cost received:", currentCost);
  console.log("Location State Type:", typeof location.state);

  // Formatter helpers
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toISOString().split('T')[0];
  };

  const formatTimeForInput = (timeStr) => {
    if (!timeStr) return "10:00";
    return timeStr.split(' ')[0];
  }

  // State
  const [pickupDate, setPickupDate] = useState(formatDateForInput(existingPickupDate) || new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState(formatTimeForInput(existingPickupTime));
  const [returnDate, setReturnDate] = useState(formatDateForInput(existingReturnDate) || new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [returnTime, setReturnTime] = useState(formatTimeForInput(existingReturnTime));

  const [newTotalCost, setNewTotalCost] = useState(0);
  const [costDifference, setCostDifference] = useState(0);

  const [fetchedBooking, setFetchedBooking] = useState(null);

  // Fetch Booking Details (Modification Mode)
  useEffect(() => {
    if (bookingId) {
      console.log("Fetching booking details for ID:", bookingId);
      getBookingById(bookingId)
        .then(res => {
          console.log("Fetched Booking for Edit:", res.data);
          setFetchedBooking(res.data);
        })
        .catch(err => {
          console.error("Error fetching booking for modify:", err);
          alert("Failed to fetch booking details. Please try again.");
          navigate("/mybookings");
        });
    }
  }, [bookingId, navigate]);

  // Validation Check
  useEffect(() => {
    if (!vehicleId && !bookingId) {
      // Only redirect if truly missing critical data
      // But wait for hydration? state comes from history, so should be immediate.
      console.warn("Missing vehicleId or bookingId, redirecting...");
      alert("No vehicle/booking selected. Returning to home.");
      navigate("/");
    }
  }, [vehicleId, bookingId, navigate]);

  // Calculate Cost
  useEffect(() => {
    calculateCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupDate, pickupTime, returnDate, returnTime, fetchedBooking, ratePerDay]);

  const calculateCost = () => {
    if (!pickupDate || !returnDate || !ratePerDay) return;

    const start = new Date(`${pickupDate}T${pickupTime}:00`);
    const end = new Date(`${returnDate}T${returnTime}:00`);

    if (end <= start) {
      setNewTotalCost(0);
      setCostDifference(0);
      return;
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const total = diffDays * parseFloat(ratePerDay);

    setNewTotalCost(total);
    setNewTotalCost(total);
    if (bookingId) {
      // Use fetched totalAmount if available, otherwise fall back to state passed
      const originalPaid = fetchedBooking ? fetchedBooking.totalAmount : parseFloat(currentCost);
      setCostDifference(total - originalPaid);
    } else {
      setCostDifference(0);
    }
  };

  // Time options
  const timeOptions = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 9;
    const time = `${hour.toString().padStart(2, '0')}:00`;
    return (
      <option key={time} value={time}>
        {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 ${hour === 12 ? 'PM' : 'AM'}`}
      </option>
    );
  });

  const handleContinue = async () => {
    try {
      const bookingDto = {
        vehicleId: vehicleId,
        pickupDateTime: `${pickupDate}T${pickupTime}:00`,
        returnDateTime: `${returnDate}T${returnTime}:00`,
        totalAmount: newTotalCost // Frontend calculation validation
      };

      if (bookingId) {
        // === UPDATE MODE ===
        if (costDifference > 0) {
          // NAVIGATE TO PAYMENT FOR DIFFERENCE
          navigate("/payment", {
            state: {
              bookingId: bookingId,
              amount: costDifference, // Pay only the difference
              vehicleModel: vehicleModel,
              isUpdate: true, // Flag for Payment page
              newBookingDates: {
                pickupDateTime: bookingDto.pickupDateTime,
                returnDateTime: bookingDto.returnDateTime
              },
              newTotalAmount: newTotalCost
            }
          });

        } else {
          // No extra payment needed, direct update
          const modifyDto = {
            bookingId: bookingId,
            pickupDateTime: bookingDto.pickupDateTime,
            returnDateTime: bookingDto.returnDateTime
          };

          const response = await updateBooking(bookingId, modifyDto);
          alert(`Booking Updated Successfully! New Total: ₹${response.data.totalAmount}`);
          navigate("/mybookings");
        }

      } else {
        // === CREATE MODE ===
        const response = await createBooking(bookingDto);
        const booking = response.data;

        navigate("/payment", {
          state: {
            bookingId: booking.bookingId,
            amount: booking.totalAmount,
            vehicleModel: vehicleModel
          }
        });
      }

    } catch (error) {
      console.error("Failed to process booking", error);
      alert("Failed to process request. Please try again.");
    }
  };

  return (
    <div className="booking-wrapper">
      <div className="back-link" onClick={() => navigate(-1)}>
        ← {bookingId ? "Back to My Bookings" : "Back to Vehicle Details"}
      </div>

      <div className="stepper">
        <div className="step active">
          <span>1</span> {bookingId ? "Edit Booking" : "Booking Details"}
        </div>
        {!bookingId && (
          <>
            <div className="step">2 Payment</div>
            <div className="step">3 Confirmation</div>
          </>
        )}
        {bookingId && costDifference > 0 && (
          <div className="step">2 Payment (Difference)</div>
        )}
      </div>

      <div className="content-grid">
        <div className="left-col">
          <div className="card">
            <h3>Rental Period</h3>
            <div className="grid-2">
              <div>
                <label>Pickup Date</label>
                <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
              </div>
              <div>
                <label>Pickup Time</label>
                <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}>
                  {timeOptions}
                </select>
              </div>
            </div>
            <div className="grid-2">
              <div>
                <label>Return Date</label>
                <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
              </div>
              <div>
                <label>Return Time</label>
                <select value={returnTime} onChange={(e) => setReturnTime(e.target.value)}>
                  {timeOptions}
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Pickup & Return Locations</h3>
            <div className="grid-2">
              <div>
                <label>Pickup Location</label>
                <div className="fake-input">{vehicleLocation || "Loading location..."}</div>
              </div>
              <div>
                <label>Return Location</label>
                <div className="fake-input">{vehicleLocation || "Loading location..."}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-col">
          <div className="summary-card">
            <h3>{bookingId ? "Booking Update" : "Booking Summary"}</h3>
            <img src={carIcon} alt="car" />
            <h4>{vehicleModel}</h4>
            <p>Vehicle ID: {vehicleId}</p>
            <div className="insurance">✔ Comprehensive insurance included</div>

            <hr />

            {bookingId ? (
              // UPDATE SUMMARY
              <div className="cost-breakdown">
                <div className="row">
                  <span>Original Paid:</span>
                  <span>₹{fetchedBooking ? fetchedBooking.totalAmount : currentCost}</span>
                </div>
                <div className="row">
                  <span>New Total:</span>
                  <span>₹{newTotalCost}</span>
                </div>
                <div className={`row total ${costDifference > 0 ? "text-danger" : "text-success"}`}>
                  <span>{costDifference >= 0 ? "Amount to Pay:" : "Refund Amount:"}</span>
                  <span>₹{Math.abs(costDifference)}</span>
                </div>
              </div>
            ) : (
              // NEW BOOKING SUMMARY
              <div className="cost-breakdown">
                <p className="mt-2">Rate: ₹{ratePerDay}/day</p>
                <div className="row total">
                  <span>Total:</span>
                  <span>₹{newTotalCost}</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <button onClick={handleContinue}>
          {bookingId ? (costDifference > 0 ? "Proceed to Pay Difference" : "Update Booking") : "Continue to Payment"}
        </button>
      </div>
    </div>
  );
};

export default BookingInfo;
