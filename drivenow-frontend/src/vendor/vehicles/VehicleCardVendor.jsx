// src/vendor/vehicles/VehicleCardVendor.jsx

import React from "react";

export default function VehicleCardVendor({v}){
  return (
    <div className="vendor-vehicle-card">
      <div className="left">
        <img src={v.image || "/assets/vehicles/placeholder.jpg"} alt={v.name} />
      </div>
      <div className="right">
        <div className="row top">
          <h4>{v.name}</h4>
          <div className={`badge ${v.status}`}>{v.status}</div>
        </div>
        <div className="meta">{v.year} • {v.type} • {v.fuel}</div>
        {v.current && <div className="rented">Currently Rented<br/><small>{v.current.customer} • {v.current.from} to {v.current.to}</small></div>}
        <div className="row bottom">
          <div className="price">₹{v.ratePerDay} <small>/ day</small></div>
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
