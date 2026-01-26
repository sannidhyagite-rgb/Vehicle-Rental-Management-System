// src/components/home/FeaturedVehicles.jsx
import React, { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import apiPublic from "../../api/apiPublic"; // ✅ PUBLIC axios instance

function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await apiPublic.get("/public/vehicles");
        setVehicles(res.data || []);
      } catch (err) {
        console.error("Vehicle fetch error:", err);
        setError("Unable to load vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // 🔄 Loading state
  if (loading) {
    return (
      <section className="py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading vehicles...</p>
      </section>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <section className="py-5 text-center text-danger">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section id="vehicles" className="py-5 bg-light">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-3 px-4 py-2 fs-6">
            🚗 Premium Selection
          </span>
          <h2 className="display-4 fw-bold text-dark mb-3">
            Featured Vehicles
          </h2>
          <p className="lead text-muted">
            Discover our most popular premium fleet choices
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="row g-4">
          {vehicles.length > 0 ? (
            vehicles.map((car) => (
              <div
                key={car.id}
                className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
              >
                {/* ✅ PASS FULL VEHICLE OBJECT */}
                <VehicleCard vehicle={car} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted">
              No vehicles available at the moment.
            </p>
          )}
        </div>

        {/* CTA */}
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
