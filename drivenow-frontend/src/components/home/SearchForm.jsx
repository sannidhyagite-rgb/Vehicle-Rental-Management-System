// src/components/home/SearchForm.jsx
import React from "react";

function SearchForm() {
  return (
    <div className="search-card">
      <div className="search-row">
        <div className="field">
          <label>Location</label>
          <div className="field-input with-icon">
            <span className="field-icon">📍</span>
            <input placeholder="Enter city or airport" />
          </div>
        </div>

        <div className="field">
          <label>Pickup Date</label>
          <div className="field-input with-icon">
            <input type="text" placeholder="mm/dd/yyyy" />
            <span className="field-icon-right">📅</span>
          </div>
        </div>

        <div className="field">
          <label>Return Date</label>
          <div className="field-input with-icon">
            <input type="text" placeholder="mm/dd/yyyy" />
            <span className="field-icon-right">📅</span>
          </div>
        </div>

        <div className="field">
          <label>Vehicle Type</label>
          <div className="field-input with-icon">
            <select defaultValue="all">
              <option value="all">All types</option>
              <option value="suv">SUV</option>
              <option value="electric">Electric</option>
              <option value="luxury">Luxury</option>
            </select>
            <span className="field-icon-right">⌵</span>
          </div>
        </div>

        <div className="field search-btn-wrapper">
          <button className="btn btn-dark search-btn">Search Vehicles</button>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
