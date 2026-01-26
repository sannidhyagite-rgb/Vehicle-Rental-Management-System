import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiPublic from "../api/apiPublic";

function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ detect login state
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await apiPublic.get(`/public/vehicles/${id}`);
        setVehicle(res.data);
      } catch (err) {
        console.error("Error loading vehicle", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  // ✅ unified Book Now handler
  const handleBookNow = () => {
    // Save booking intent
    localStorage.setItem("pendingBookingVehicleId", id);

    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/customerdashboard");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Loading vehicle details...</p>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!vehicle) {
    return (
      <div className="container my-5 text-center">
        <h5>Vehicle not found</h5>
      </div>
    );
  }

  const {
    company,
    model,
    year,
    fuel,
    ratePerDay,
    image,
  } = vehicle;

  return (
    <main className="container my-5">
      {/* BACK BUTTON */}
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row g-5 align-items-start">
        {/* IMAGE SECTION */}
        <div className="col-lg-7">
          <img
            src={image || "/cars/default-car.jpg"}
            alt={`${company} ${model}`}
            className="img-fluid rounded-4 shadow w-100"
            style={{ height: "420px", objectFit: "cover" }}
          />
        </div>

        {/* DETAILS SECTION */}
        <div className="col-lg-5">
          {/* TITLE */}
          <h2 className="fw-bold mb-2">
            {company} {model}
          </h2>

          {/* PRICE */}
          <div className="bg-primary text-white p-4 rounded-4 mb-4">
            <h1 className="fw-bold mb-0">₹ {ratePerDay}</h1>
            <small>per day</small>
          </div>

          {/* SPECS */}
          <div className="row g-3 mb-4">
            <div className="col-6">
              <div className="border rounded p-3 text-center">
                <small className="text-muted">Model Year</small>
                <h6 className="fw-bold mb-0">{year}</h6>
              </div>
            </div>

            <div className="col-6">
              <div className="border rounded p-3 text-center">
                <small className="text-muted">Fuel Type</small>
                <h6 className="fw-bold mb-0">{fuel}</h6>
              </div>
            </div>
          </div>

          {/* BOOK NOW BUTTON (DYNAMIC LABEL) */}
          <button
            className="btn btn-primary btn-lg w-100"
            onClick={handleBookNow}
          >
            {isLoggedIn ? "Book Now" : "Login to Book Now"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default VehicleDetails;
