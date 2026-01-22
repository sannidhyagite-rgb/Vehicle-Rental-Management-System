// src/vendor/vehicles/MyVehicles.jsx

import React, { useState, useEffect } from "react";
import VehicleCardVendor from "./VehicleCardVendor";
import "./vendor-vehicles.css";
// import vehicles from "../data/vehicles.json";
import { fetchMyVehicles } from "../api/vendorVehicleApi";
import { Link } from "react-router-dom";

export default function MyVehicles() {
  const [list, setList] = useState([]);
  const vendorId = 1; // TEMP → JWT later

  useEffect(() => {
    fetchMyVehicles(vendorId)
      .then(data => setList(data))
      .catch(() => alert("Failed to load vehicles"));
  }, []);

  return (
    <div className="vendor-page-shell">
      <div className="vendor-container">
        <div className="page-header">
          <div>
            <h1>My Vehicles</h1>
            <p className="subtitle">Manage your vehicle fleet and track performance</p>
          </div>
          <div>
            <Link to="/vendor/vehicles/new" className="btn btn-primary">
              + Add New Vehicle
            </Link>
          </div>
        </div>

        <div className="vehicles-grid">
          {list.map(v => (
            <VehicleCardVendor key={v.id} v={v} />
          ))}
        </div>
      </div>
    </div>
  );
}
