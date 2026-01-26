import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApprovedVehicles } from "../../api/customerVehicleApi";
import SearchForm from "../../components/home/SearchForm";

function CustomerDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApprovedVehicles()
      .then((data) => setVehicles(data))
      .catch(() => alert("Failed to load vehicles"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading vehicles...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* 🔍 SEARCH FORM (below navbar) */}
      <SearchForm />

      {/* 🚗 AVAILABLE VEHICLES */}
      <h3 className="mb-4 mt-5">Available Vehicles</h3>

      {vehicles.length === 0 ? (
        <div className="alert alert-info">
          No vehicles available right now
        </div>
      ) : (
        <div className="row">
          {vehicles.map((v) => (
            <div className="col-md-4 mb-4" key={v.id}>
              <div className="card shadow-sm h-100">

                {/* Image */}
                {v.image ? (
                  <img
                    src={v.image}
                    className="card-img-top"
                    alt={v.company}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{ height: "200px" }}
                  >
                    No Image
                  </div>
                )}

                {/* Body */}
                <div className="card-body">
                  <h5 className="card-title">
                    {v.company} {v.model}
                  </h5>

                  <p className="text-muted mb-1">
                    {v.year} • {v.fuel}
                  </p>

                  <h6 className="text-success">
                    ₹{v.ratePerDay} / day
                  </h6>
                </div>

                {/* Footer */}
                <div className="card-footer bg-white border-0">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate(`/vehicle/${v.id}`)}
                  >
                    View Details
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerDashboard;
