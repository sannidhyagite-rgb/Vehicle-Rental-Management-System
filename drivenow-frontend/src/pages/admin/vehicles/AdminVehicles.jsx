import React, { useEffect, useState } from "react";
import {
  getAdminVehicles,
  approveVehicle,
  rejectVehicle
} from "../../../vendor/api/adminVehicleApi";

function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await getAdminVehicles(status);
      setVehicles(data);
    } catch (err) {
      alert("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, [status]);

  const handleApprove = async (id) => {
    await approveVehicle(id);
    loadVehicles();
  };

  const handleReject = async (id) => {
    await rejectVehicle(id);
    loadVehicles();
  };

  const badgeClass = (status) => {
    if (status === "APPROVED") return "badge bg-success";
    if (status === "REJECTED") return "badge bg-danger";
    return "badge bg-warning text-dark";
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Admin – Vehicle Management</h3>

      {/* Status Tabs */}
      <div className="btn-group mb-4">
        {["PENDING", "APPROVED", "REJECTED"].map((s) => (
          <button
            key={s}
            className={`btn ${
              status === s ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Model</th>
              <th>Year</th>
              <th>Vendor</th>
              <th>Status</th>
              {status === "PENDING" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No vehicles found
                </td>
              </tr>
            ) : (
              vehicles.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.company}</td>
                  <td>{v.model}</td>
                  <td>{v.year}</td>
                  <td>{v.vendorName}</td>
                  <td>
                    <span className={badgeClass(v.status)}>
                      {v.status}
                    </span>
                  </td>

                  {status === "PENDING" && (
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleApprove(v.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleReject(v.id)}
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminVehicles;
