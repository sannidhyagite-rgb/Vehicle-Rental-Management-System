import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerVehicleById } from "../api/customerVehicleApi";

function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await getCustomerVehicleById(id);
        setVehicle(res.data);
      } catch (err) {
        console.error("Error loading vehicle", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        />
      </div>
    );
  }

  if (!vehicle) {
    return <p className="text-center mt-5">Vehicle not found</p>;
  }

  const reviews = [
    { id: 1, name: "John D.", rating: 5, comment: "Amazing ride!" },
    { id: 2, name: "Sarah K.", rating: 4, comment: "Very comfortable." },
  ];

  return (
    <main className="container my-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row g-5">
        {/* Image */}
        <div className="col-lg-7">
          <img
            src={vehicle.image}
            className="img-fluid rounded-4 shadow-lg w-100"
            alt={vehicle.model}
            style={{ height: "450px", objectFit: "cover" }}
          />

          <div className="mt-4 text-center">
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => setShowReviews(true)}
            >
              🗨️ View Customer Reviews ({reviews.length})
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="col-lg-5">
          <h1 className="fw-bold mb-3">
            {vehicle.company} {vehicle.model}
          </h1>

          <div className="bg-primary text-white p-4 rounded-4 mb-4">
            <h1 className="fw-bold mb-0">₹ {vehicle.ratePerDay}</h1>
            <small>per day</small>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-6"><strong>Year:</strong> {vehicle.year}</div>
            <div className="col-6"><strong>Fuel:</strong> {vehicle.fuel}</div>
          </div>

          <button
            className="btn btn-primary btn-lg w-100"
            onClick={() => navigate(`/book/${vehicle.id}`)}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Reviews Modal */}
      {showReviews && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer Reviews</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowReviews(false)}
                />
              </div>
              <div className="modal-body">
                {reviews.map((r) => (
                  <div key={r.id} className="mb-3 border-bottom pb-2">
                    <strong>{r.name}</strong>
                    <span className="text-warning ms-2">⭐ {r.rating}</span>
                    <p className="mb-1">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default VehicleDetails;
