import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  // 🔹 Map backend fields → UI fields
  const {
    id,           // ✅ FIX: include id
    company,
    model,
    year,
    fuel,
    ratePerDay,
    image,
  } = vehicle;

  const name = `${company} ${model}`;
  const price = ratePerDay;
  const type = fuel;

  const tags = [
    fuel,
    `${year} Model`,
    "AC",
  ];

  const handleViewDetails = () => {
    navigate(`/vehicle/${id}`, {
      state: { id, name, type, rating, price, tags, image }
    });
  };

  return (
    <div className="card mb-4 shadow-sm" style={{ maxWidth: "700px" }}>
      <div className="row g-0">

        {/* IMAGE */}
        <div className="col-md-4">
          <img
            src={image || "/cars/default-car.jpg"}
            className="img-fluid rounded-start"
            alt={name}
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* DETAILS */}
        <div className="col-md-8">
          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-1">{name}</h5>
              <span className="text-muted fw-bold">{year}</span>
            </div>

            <p className="text-muted mb-2">{type}</p>

            {/* TAGS */}
            <div className="mb-3">
              {tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-2">
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="badge bg-secondary">+{tags.length - 3}</span>
              )}
            </div>

            {/* PRICE + CTA */}
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-primary mb-0">
                ₹{price}
                <small className="text-muted">/day</small> {/* ✅ Original price */}
              </h5>

              <button
                className="btn btn-dark"
                onClick={handleViewDetails}
              >
                View Details
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
