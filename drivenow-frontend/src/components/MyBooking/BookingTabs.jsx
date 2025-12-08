import React from "react";

const BookingTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="booking-tabs">
      <button
        className={`booking-tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
        onClick={() => setActiveTab("upcoming")}
      >
        Upcoming
      </button>

      <button
        className={`booking-tab-btn ${activeTab === "history" ? "active" : ""}`}
        onClick={() => setActiveTab("history")}
      >
        History
      </button>
    </div>
  );
};

export default BookingTabs;
