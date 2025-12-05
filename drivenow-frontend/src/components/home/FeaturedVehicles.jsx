// src/components/home/FeaturedVehicles.jsx
import React from "react";
import VehicleCard from "./VehicleCard";

const vehicles = [
  {
    id: 1,
    name: "BMW X5",
    type: "SUV",
    rating: 4.8,
    price: 89,
    tags: ["GPS", "Bluetooth", "AC"],
    imageClass: "v1",
  },
  {
    id: 2,
    name: "Tesla Model 3",
    type: "Electric",
    rating: 4.9,
    price: 79,
    tags: ["Autopilot", "Supercharging", "Premium Interior"],
    imageClass: "v2",
  },
  {
    id: 3,
    name: "Mercedes C-Class",
    type: "Luxury",
    rating: 4.7,
    price: 95,
    tags: ["Leather Seats", "Premium Sound", "Navigation"],
    imageClass: "v3",
  },
];

function FeaturedVehicles() {
  return (
    <section id="vehicles" className="featured">
      <h2 className="section-title">Featured Vehicles</h2>
      <p className="section-subtitle">
        Popular choices from our premium fleet
      </p>

      <div className="cards-row">
        {vehicles.map((car) => (
          <VehicleCard key={car.id} {...car} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedVehicles;
