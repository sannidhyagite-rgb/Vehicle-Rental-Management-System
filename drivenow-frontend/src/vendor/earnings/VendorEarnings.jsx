// src/vendor/earnings/VendorEarnings.jsx

import React from "react";
import "./vendor-earnings.css";
import dashboard from "../data/dashboard.json";

export default function VendorEarnings(){
  const { revenue, totalBookings } = { revenue: dashboard.revenue, totalBookings: dashboard.totalBookings || 4 };

  return (
    <div className="vendor-page-shell">
      <div className="vendor-container">
        <h1>Earnings & Analytics</h1>
        <p className="subtitle">Track your revenue and vehicle performance</p>

        <div className="metrics-row">
          <div className="metric-card"><div className="metric-title">Total Earnings</div><div className="metric-value">₹{revenue}</div></div>
          <div className="metric-card"><div className="metric-title">Total Bookings</div><div className="metric-value">{totalBookings}</div></div>
          <div className="metric-card"><div className="metric-title">Average Booking</div><div className="metric-value">₹496</div></div>
          <div className="metric-card"><div className="metric-title">Fleet Utilization</div><div className="metric-value">72%</div></div>
        </div>

        <div className="charts-row">
          <div className="chart-card">
            <h3>Monthly Earnings</h3>
            <div className="bar-chart-small">[Bar chart placeholder]</div>
          </div>
          <div className="chart-card">
            <h3>Vehicle Performance</h3>
            <div className="pie-chart-small">[Pie chart placeholder]</div>
          </div>
        </div>

        <div className="panel">
          <h3>Recent Bookings</h3>
          <table className="table">
            <thead><tr><th>Vehicle</th><th>Customer</th><th>Dates</th><th>Duration</th><th>Rate</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {dashboard.recentBookings.map(b => (
                <tr key={b.id}>
                  <td>{b.vehicle}</td><td>{b.customer}</td>
                  <td>{b.from} to {b.to}</td>
                  <td>{b.duration} days</td>
                  <td>₹{b.rate}/day</td><td>₹{b.total}</td>
                  <td><span className={`status ${b.status}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
