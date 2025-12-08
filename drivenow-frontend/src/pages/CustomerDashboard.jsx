// src/pages/CustomerDashboard.jsx
import React from "react";
import SearchForm from "../components/home/SearchForm";
import VehicleCard from "../components/home/VehicleCard";
import { cars } from "../data/cars"; // Make sure you have this file with 8 car objects

function CustomerDashboard() {
  return (
    <div className="customerdashboard">
      
      {/* Hero section */}
      <section className="hero text-center py-5 bg-light">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Rental</h1>
          <p className="hero-subtitle">
            Choose from our premium fleet of vehicles for any occasion.
          </p>
        </div>
      </section>

      {/* Search card */}
      <div className="container my-4">
        <SearchForm />
      </div>

      {/* Vehicle Cards */}
      <div className="container my-4">
        <div className="row">
          {cars.map((car, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <VehicleCard {...car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
