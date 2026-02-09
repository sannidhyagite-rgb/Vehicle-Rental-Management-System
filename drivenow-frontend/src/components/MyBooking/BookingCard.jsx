import React from "react";
import { useNavigate } from "react-router-dom";
import carIcon from "../../assets/car.png";
import historyCarIcon from "../../assets/historycar.png";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { cancelBooking } from "../../api/bookingApi";

const BookingCard = ({ data, tab, onRefresh }) => {

  const navigate = useNavigate();

  const handleModify = () => {
    const stateData = {
      // Pass fields expected by BookingInfo
      vehicleId: data.vehicleId,
      vehicleModel: data.carName,
      ratePerDay: data.ratePerDay,
      vehicleLocation: data.location,
      bookingId: data.id,

      existingPickupDate: data.pickupDate,
      existingPickupTime: data.pickupTime,
      existingReturnDate: data.returnDate,
      existingReturnTime: data.returnTime,
      currentCost: data.cost // Current total cost
    };
    console.log("Navigating to Modify with State:", stateData);

    navigate("/booking-info", {
      state: stateData
    });
  };

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        console.log("Attempting to cancel booking ID:", data.id);
        await cancelBooking(data.id);
        alert("Booking cancelled successfully.");
        if (onRefresh) onRefresh(); // Refresh the list
      } catch (error) {
        console.error("Failed to cancel booking:", error);
        alert(`Failed to cancel booking. Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const carImage = tab === "history" ? historyCarIcon : carIcon;

  return (
    <div className="booking-card-container">

      {/* Car Image */}
      <div className="booking-img">
        <img src={carImage} alt="Car" />
      </div>

      {/* Car Details */}
      <div className="booking-info">
        <h2 className="car-title">{data.carName}</h2>
        <p className="car-type">{data.type}</p>
        <span className={`status-badge ${data.status}`}>
          {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
        </span>
      </div>

      {/* Pickup */}
      <div className="booking-section">
        <p className="section-label"><FaCalendarAlt className="icon" /> Pickup</p>
        <p className="section-value">{data.pickupDate}</p>
        <p className="section-time">{data.pickupTime}</p>
      </div>

      {/* Return */}
      <div className="booking-section">
        <p className="section-label"><FaCalendarAlt className="icon" /> Return</p>
        <p className="section-value">{data.returnDate}</p>
        <p className="section-time">{data.returnTime}</p>
      </div>

      {/* Location */}
      <div className="booking-section">
        <p className="section-label"><FaMapMarkerAlt className="icon" /> Location</p>
        <p className="section-value">{data.location}</p>
        <p className="section-time">{data.days} day(s)</p>
      </div>

      {/* Right Section */}
      <div className="booking-actions">
        <h2 className="price">₹{data.cost}</h2>
        <p className="total-cost-label">Total Cost</p>

        <div className="action-buttons">
          {tab === "upcoming" && (
            <>

              <button
                className="action-btn modify"
                onClick={handleModify}
              >
                Modify
              </button>

              <button
                className="action-btn cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="action-btn receipt"
                onClick={() => navigate("/receipt", { state: { booking: data } })}
              >
                Receipt
              </button>
            </>
          )}

          {tab === "history" && (
            <button
              className="action-btn receipt"
              onClick={() => navigate("/receipt", { state: { booking: data } })}
            >
              Receipt
            </button>
          )}
        </div>
      </div>
    </div >
  );
};

export default BookingCard;
