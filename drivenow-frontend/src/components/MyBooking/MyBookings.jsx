import React, { useState } from "react";
import SummaryCards from "./SummaryCards"
import BookingTabs from "./BookingTabs";
import BookingList from "./BookingList";
import "./MyBooking.css";
import "../../assets/calender.png"
import "../../assets/completed.png"
import "../../assets/spent.png"
import "../../assets/car.png"
import "../../assets/historycar.png"
const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const bookings = [
    {
      id: 1,
      carName: "BMW X5",
      type: "SUV",
      pickupDate: "12/15/2024",
      pickupTime: "10.00",
      returnDate: "12/18/2024",
      returnTime: "10.00",
      location: "Downtown Location",
      days:3,
      status: "upcoming",
      cost: 267,
      img: "/car1.png"
    },
    {
      id: 2,
      carName: "Audi A4",
      type: "Sedan",
      pickupDate: "08/15/2024",
      pickupTime: "09.00",
      returnDate: "08/18/2024",
      returnTime: "09.00",
      location: "Airport Office",
      days :"5",
      status: "completed",
      cost: 350,
      img: "/car2.png"
    }
  ];

  const upcoming = bookings.filter(b => b.status === "upcoming");
  const completed = bookings.filter(b => b.status === "completed");

  const totalSpent = completed.reduce((sum, b) => sum + b.cost, 0);

  return (
    <div className="mybookings-page">
      <h2 className="mybookings-title">My Bookings</h2>
      <h5 className="mybookings-desc">Manage your vehicle reservations</h5>

      <SummaryCards
        upcomingCount={upcoming.length}
        completedCount={completed.length}
        totalSpent={totalSpent}
      />

      <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <BookingList list={activeTab === "upcoming" ? upcoming : completed} tab={activeTab} />
    </div>
  );
};

export default MyBookings;
