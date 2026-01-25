// src/vendor/vehicles/MyVehicles.jsx

import React, { useState, useEffect } from "react";
import VehicleCardVendor from "./VehicleCardVendor";
import "./vendor-vehicles.css";
import { fetchMyVehicles } from "../api/vendorVehicleApi";
import { Link } from "react-router-dom";

export default function MyVehicles() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyVehicles()
      .then(data => setList(data))
      .catch(() => alert("Failed to load vehicles"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading vehicles...</p>;
  }

  return (
    <div className="vendor-page-shell">
      <div className="vendor-container">
        <div className="page-header">
          <div>
            <h1>My Vehicles</h1>
            <p className="subtitle">
              Manage your vehicle fleet and track performance
            </p>
          </div>
          <div>
            <Link to="/vendor/vehicles/new" className="btn btn-primary">
              + Add New Vehicle
            </Link>
          </div>
        </div>

        {list.length === 0 ? (
          <p>No vehicles added yet.</p>
        ) : (
          <div className="vehicles-grid">
            {list.map(v => (
              <VehicleCardVendor key={v.id} v={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
