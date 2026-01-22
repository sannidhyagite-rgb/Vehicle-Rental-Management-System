// src/vendor/vehicles/MyVehicles.jsx

import React, { useState, useEffect } from "react";
import VehicleCardVendor from "./VehicleCardVendor";
import "./vendor-vehicles.css";
import vehicles from "../data/vehicles.json";
import { Link } from "react-router-dom";

export default function MyVehicles() {
  const [list, setList] = useState([]);

  useEffect(() => {
    // load dummy data
    setList(vehicles);
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
            <Link to="/vendor/vehicles/new" className="btn btn-primary">+ Add New Vehicle</Link>
          </div>
        </div>

        <div className="filters-card">
          <input
            placeholder="Search vehicles..."
            className="search-input"
          />

          <select className="select" defaultValue="">
            <option value="" disabled>
              Status
            </option>
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
          </select>
        </div>

        <div className="vehicles-grid">
          {list.map(v => <VehicleCardVendor key={v.id} v={v} />)}
        </div>
      </div>
    </div>
  );
}
