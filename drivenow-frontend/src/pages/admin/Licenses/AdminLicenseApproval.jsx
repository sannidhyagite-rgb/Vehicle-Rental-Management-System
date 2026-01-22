import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./admin-license.css";

export default function AdminLicenseApproval() {
  const [licenses, setLicenses] = useState([]);

  const loadLicenses = async () => {
    const res = await api.get("/admin/licenses/pending");
    setLicenses(res.data);
  };

  const approve = async (id) => {
    await api.post(`/admin/licenses/${id}/approve`);
    loadLicenses();
  };

  const reject = async (id) => {
    await api.post(`/admin/licenses/${id}/reject`);
    loadLicenses();
  };

  useEffect(() => {
    loadLicenses();
  }, []);

  return (
    <div className="admin-panel">
      <h1>Pending License Verifications</h1>

      {licenses.length === 0 && <p>No pending requests</p>}

      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>License No</th>
            <th>DOB</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map(l => (
            <tr key={l.id}>
              <td>{l.user.fullName}</td>
              <td>{l.licenseNumber}</td>
              <td>{l.dateOfBirth}</td>
              <td>{l.expiryDate}</td>
              <td>
                <button className="btn-success" onClick={() => approve(l.id)}>Approve</button>
                <button className="btn-danger" onClick={() => reject(l.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
