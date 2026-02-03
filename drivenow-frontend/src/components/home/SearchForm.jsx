// src/components/home/SearchForm.jsx
import React from "react";

function SearchForm({ onSearch }) {
  const [location, setLocation] = React.useState("");
  const [pickupDate, setPickupDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [type, setType] = React.useState("all");

  const handleSubmit = () => {
    if (onSearch) {
      onSearch({ location, pickupDate, returnDate, type });
    }
  };

  return (
    <div className="search-card">
      <div className="search-row">
        <div className="field">
          <label>Location</label>
          <div className="field-input with-icon">
            <span className="field-icon">📍</span>
            <input
              placeholder="Enter city or airport"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Pickup Date</label>
          <div className="field-input with-icon">
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Return Date</label>
          <div className="field-input with-icon">
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Vehicle Type</label>
          <div className="field-input with-icon">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="all">All types</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
              <option value="Sedan">Sedan</option>
              <option value="Luxury">Luxury</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>
        </div>

        <div className="field search-btn-wrapper">
          <button className="btn btn-dark search-btn" onClick={handleSubmit}>Search Vehicles</button>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
