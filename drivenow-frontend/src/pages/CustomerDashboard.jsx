// src/pages/CustomerDashboard.jsx
import React, { useEffect, useState } from "react";
import SearchForm from "../components/home/SearchForm";
import VehicleCard from "../components/home/VehicleCard";
import { getAllVehicles } from "../api/vehicleApi";

function CustomerDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await getAllVehicles();
      // Map backend DTO to VehicleCard props
      // Backend: { id, model, company, ratePerDay, fuel, transmission, ... }
      const mapped = response.data.map(v => ({
        id: v.id,
        name: `${v.company} ${v.model}`,
        type: v.fuel, // or v.type if available
        rating: 4.8, // placeholder
        price: v.ratePerDay,
        tags: [v.transmission, v.fuel, "AC"],
        image: v.image || "/cars/car1.jpg",

        // Add raw fields for filtering
        rawType: v.fuel, // Assuming fuel filters map to types for now, or use a proper type field
        location: v.city // For city filtering
      }));
      setVehicles(mapped);
      setFilteredVehicles(mapped);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (criteria) => {
    const { location, type } = criteria;

    let result = vehicles;

    if (location) {
      result = result.filter(v =>
        (v.location || "").toLowerCase().includes(location.toLowerCase())
      );
    }

    if (type && type !== "all") {
      // Map frontend type to backend/data type if needed. For now assuming string match.
      // Or check if the type is contained in the name (e.g. "SUV") if type field is unreliable
      result = result.filter(v => {
        // Try matching mapped type or part of name
        const vType = (v.type || "").toLowerCase();
        const vName = (v.name || "").toLowerCase();
        const searchType = type.toLowerCase();
        return vType.includes(searchType) || vName.includes(searchType);
      });
    }

    setFilteredVehicles(result);
  };

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
        <SearchForm onSearch={handleSearch} />
      </div>

      {/* Vehicle Cards */}
      <div className="container my-4">
        <h3 className="mb-4">Available Vehicles</h3>
        {loading ? (
          <div className="text-center py-5"><p>Loading vehicles...</p></div>
        ) : (
          <div className="row g-4">
            {filteredVehicles.map((car) => (
              <div key={car.id} className="col-md-6 col-lg-4">
                <VehicleCard {...car} />
              </div>
            ))}
            {filteredVehicles.length === 0 && <p>No vehicles found matching your criteria.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;
