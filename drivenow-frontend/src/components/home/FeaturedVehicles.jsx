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
    image: "/cars/car1.jpg",
  },
  {
    id: 2,
    name: "Tesla Model 3",
    type: "Electric",
    rating: 4.9,
    price: 79,
    tags: ["Autopilot", "Supercharging", "Premium Interior"],
    image: "/cars/car2.jpg",
  },
  {
    id: 3,
    name: "Mercedes C-Class",
    type: "Luxury",
    rating: 4.7,
    price: 95,
    tags: ["Leather Seats", "Premium Sound", "Navigation"],
    image: "/cars/car3.jpg",
  },
];

function FeaturedVehicles() {
  return (
    <section id="vehicles" className="py-5 bg-light">
      <div className="container">
        {/* Enhanced Header */}
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-3 px-4 py-2 fs-6">🚗 Premium Selection</span>
          <h2 className="display-4 fw-bold text-dark mb-3">Featured Vehicles</h2>
          <p className="lead text-muted mb-0">
            Discover our most popular premium fleet choices
          </p>
        </div>

        {/* Perfect Responsive Grid */}
        <div className="row g-4">
          {vehicles.map((car) => (
            <div key={car.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
              <VehicleCard {...car} />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-5">
          <button className="btn btn-primary btn-lg px-5">
            View All Vehicles →
          </button>
        </div>
      </div>
    </section>
  );
}


export default FeaturedVehicles;
