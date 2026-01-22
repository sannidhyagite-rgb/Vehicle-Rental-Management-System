import React, { useEffect, useState } from "react";
import {
  getPendingLicenses,
  verifyLicense,
} from "../../api/adminApi";

export default function AdminLicenseVerification() {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingLicenses = async () => {
    setLoading(true);
    try {
      const res = await getPendingLicenses();
      setLicenses(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load pending licenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingLicenses();
  }, []);

  const handleVerify = async (licenseId, approve) => {
    try {
      await verifyLicense(licenseId, approve);
      alert(
        approve
          ? "License approved successfully"
          : "License rejected successfully"
      );
      fetchPendingLicenses();
    } catch (err) {
      console.error(err);
      alert("Failed to update license status");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">
        Driving License Verification
      </h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" />
        </div>
      ) : licenses.length === 0 ? (
        <div className="alert alert-info text-center">
          No pending licenses
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>License No</th>
                <th>DOB</th>
                <th>Issue Date</th>
                <th>Expiry Date</th>
                <th>Type</th>
                <th style={{ width: "160px" }} className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {licenses.map((l) => (
                <tr key={l.id}>
                  <td>{l.user.fullName}</td>
                  <td>{l.licenseNumber}</td>
                  <td>{l.dateOfBirth}</td>
                  <td>{l.issueDate}</td>
                  <td>{l.expiryDate}</td>
                  <td>{l.licenseType}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleVerify(l.id, true)}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleVerify(l.id, false)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
