import React from "react";
import { useNavigate } from "react-router-dom";
import carIcon from "../../assets/car.png";
import historyCarIcon from "../../assets/historycar.png";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const BookingCard = ({ data, tab }) => {

  const navigate = useNavigate();

  const handleModify = () => {
    navigate("/modify-booking", {
      state: { bookingData: data }       // <-- sending full booking data
    });
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
        <span className="status-badge">Confirmed</span>
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
        <h2 className="price">${data.cost}</h2>
        <p className="total-cost-label">Total Cost</p>

        <div className="action-buttons">
          {tab === "upcoming" && (
            <>

              <button
                className="action-btn modify"
                onClick={() =>
                  navigate("/booking-info", { state: { bookingData: data } })
                }
              >
                ✏️ Modify
              </button>

              <button className="action-btn cancel">✖ Cancel</button>

              <button className="action-btn receipt">📄 Receipt</button>
            </>
          )}

          {tab === "history" && (
            <button className="action-btn receipt">📄 Receipt</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
