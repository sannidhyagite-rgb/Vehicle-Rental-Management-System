import React, { useState, useEffect } from "react";
import SummaryCards from "./SummaryCards"
import BookingTabs from "./BookingTabs";
import BookingList from "./BookingList";
import "./MyBooking.css";
/* Assets imports kept as is if used by subcomponents, though SummaryCards should use them */
import "../../assets/calender.png"
import "../../assets/completed.png"
import "../../assets/spent.png"
import "../../assets/car.png"
import "../../assets/historycar.png"

import { getUpcoming, getHistory } from "../../api/bookingApi";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const [upcomingRes, completedRes] = await Promise.all([
        getUpcoming(),
        getHistory()
      ]);

      // Map backend DTO to frontend structure if needed
      // Assuming backend DTO matches what BookingList expects or mapping is simple
      // Backend DTO: { bookingId, vehicleName, pickupDateTime, returnDateTime, totalAmount, status, vehicleId, city, address }

      const mapBooking = (b) => ({
        id: b.bookingId,
        // New fields for Modify
        vehicleId: b.vehicleId,
        ratePerDay: b.ratePerDay,

        carName: b.vehicleName,
        type: "Car", // DTO doesn't send type, default or fetch
        pickupDate: new Date(b.pickupDateTime).toLocaleDateString(),
        pickupTime: new Date(b.pickupDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        returnDate: new Date(b.returnDateTime).toLocaleDateString(),
        returnTime: new Date(b.returnDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        location: b.city ? `${b.address}, ${b.city}` : "Location not available",
        days: calculateDays(b.pickupDateTime, b.returnDateTime),
        status: b.status.toLowerCase(),
        cost: b.totalAmount,
        img: "/car1.png" // Placeholder or fetch from vehicleId
      });

      console.log("Upcoming Raw API Data:", upcomingRes.data);
      console.log("Upcoming Mapped Data:", upcomingRes.data.map(mapBooking));

      console.log("Completed Raw API Data:", completedRes.data);
      console.log("Completed Mapped Data:", completedRes.data.map(mapBooking));

      setUpcoming(upcomingRes.data.map(mapBooking));
      setCompleted(completedRes.data.map(mapBooking));

    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e - s);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const totalSpent = completed.reduce((sum, b) => sum + b.cost, 0);

  if (loading) return <div className="text-center mt-5"><p>Loading bookings...</p></div>;

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

      <BookingList list={activeTab === "upcoming" ? upcoming : completed} tab={activeTab} onRefresh={fetchBookings} />
    </div>
  );
};

export default MyBookings;
