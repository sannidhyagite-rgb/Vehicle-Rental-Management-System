import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function VehicleCard({ id, name, type, rating, price, tags, image }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/vehicle/${id}`, { 
      state: { id, name, type, rating, price, tags, image } 
    });
  };

  return (
    <div className="card mb-4 shadow-sm" style={{ maxWidth: "700px" }}> {/* ✅ Original layout */}
      <div className="row g-0">
        <div className="col-md-4"> {/* ✅ Original image width */}
          <img
            src={image}
            className="img-fluid rounded-start"
            alt={name}
            style={{ height: "100%", objectFit: "cover" }} // ✅ Original image style
          />
        </div>

        <div className="col-md-8"> {/* ✅ Original details width */}
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-1">{name}</h5> {/* ✅ Original title */}
              <span className="text-warning fw-bold">⭐ {rating}</span> {/* ✅ Original rating */}
            </div>

            <p className="text-muted mb-2">{type}</p> {/* ✅ Original type */}

            <div className="mb-3">
              {tags.slice(0, 3).map((tag) => ( // ✅ Limit tags like before
                <span key={tag} className="badge bg-secondary me-2">
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="badge bg-secondary">+{tags.length-3}</span>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-primary mb-0">
                ${price}
                <small className="text-muted">/day</small> {/* ✅ Original price */}
              </h5>

              <button className="btn btn-dark" onClick={handleViewDetails}> {/* ✅ Original button */}
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
