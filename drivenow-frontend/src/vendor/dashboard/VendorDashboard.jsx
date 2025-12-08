// src/vendor/dashboard/VendorDashboard.jsx

import React from "react";
import "./vendor-dashboard.css";
import data from "../data/dashboard.json";

export default function VendorDashboard(){
  const { totalVehicles, activeBookings, revenue, recentBookings } = data;

  return (
    <div className="vendor-page-shell">
      <div className="vendor-container">
        <h1 className="vendor-title">Dashboard</h1>

        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-title">Total Vehicles</div>
            <div className="metric-value">{totalVehicles}</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Active Bookings</div>
            <div className="metric-value">{activeBookings}</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Revenue (₹)</div>
            <div className="metric-value">₹{revenue}</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Fleet Utilization</div>
            <div className="metric-value">72%</div>
          </div>
        </div>

        <div className="charts-row">
          <div className="chart-card">
            <h3>Monthly Earnings</h3>
            <div className="bar-chart-placeholder">[Bar chart placeholder — integrate chart later]</div>
          </div>
          <div className="chart-card">
            <h3>Vehicle Performance</h3>
            <div className="pie-chart-placeholder">[Pie chart placeholder]</div>
          </div>
        </div>

        <div className="panel">
          <h3>Recent Bookings</h3>
          <table className="table">
            <thead>
              <tr><th>Vehicle</th><th>Customer</th><th>Dates</th><th>Duration</th><th>Rate</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {recentBookings.map(r => (
                <tr key={r.id}>
                  <td>{r.vehicle}</td>
                  <td>{r.customer}</td>
                  <td>{r.from} to {r.to}</td>
                  <td>{r.duration} days</td>
                  <td>₹{r.rate}/day</td>
                  <td>₹{r.total}</td>
                  <td><span className={`status ${r.status}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
