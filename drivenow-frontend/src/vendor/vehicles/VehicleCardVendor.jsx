// src/vendor/vehicles/VehicleCardVendor.jsx

import React from "react";

export default function VehicleCardVendor({ v }) {
  const firstImage =
    v.images && v.images.length > 0
      ? v.images[0]
      : "/assets/vehicles/placeholder.jpg";

  return (
    <div className="vendor-vehicle-card">
      <div className="left">
        <img src={firstImage} alt={v.title} />
      </div>

      <div className="right">
        {/* TOP ROW */}
        <div className="row top">
          <div className="title-with-status">
            <h4>{v.title}</h4>
            <span className={`badge ${v.status.toLowerCase()}`}>
              {v.status}
            </span>
          </div>
        </div>

        {/* META */}
        <div className="meta">{v.subtitle}</div>

        {/* BOTTOM ROW */}
        <div className="row bottom">
          <div className="price">
            ₹{v.ratePerDay} <small>/ day</small>
          </div>

          <div className="actions">
            <button className="action">👁</button>
            <button className="action">✎</button>
            <button className="action">⋯</button>
          </div>
        </div>
      </div>
    </div>
  );
}
