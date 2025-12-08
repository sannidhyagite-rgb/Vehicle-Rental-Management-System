import React from "react";
import calendarIcon from "../../assets/calender.png"
import completedIcon from "../../assets/completed.png"
import spentIcon from "../../assets/spent.png"

const SummaryCards = ({ upcomingCount, completedCount, totalSpent }) => {
  return (
    <div className="summary-container">
      <div className="summary-card">
        <img src={calendarIcon} alt="Upcoming Icon" className="summary-icon" />
        <p>Upcoming</p>
        <h2>{upcomingCount}</h2>
      </div>

      <div className="summary-card">
          <img src={completedIcon} alt="Completed Icon" className="summary-icon" />
        <p>Completed</p>
        <h2>{completedCount}</h2>
      </div>

      <div className="summary-card">
          <img src={spentIcon} alt="Completed Icon" className="summary-icon" />
        <p>Total Spent</p>
        <h2>${totalSpent}</h2>
      </div>
    </div>
  );
};

export default SummaryCards;
