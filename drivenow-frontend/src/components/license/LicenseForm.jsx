import React, { useState, useEffect } from "react";
import { submitLicense } from "../../api/licenseApi";

export default function LicenseForm({
  mode = "FULL", // FULL | LIMITED
  initialData = {},
  onSuccess,
}) {
  const [form, setForm] = useState({
    licenseNumber: "",
    dateOfBirth: "",
    issueDate: "",
    expiryDate: "",
    licenseType: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        licenseNumber: initialData.licenseNumber || "",
        dateOfBirth: initialData.dateOfBirth || "",
        issueDate: initialData.issueDate || "",
        expiryDate: initialData.expiryDate || "",
        licenseType: initialData.licenseType || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await submitLicense(form);
      setMessage({
        type: "success",
        text: "License details updated successfully",
      });
      onSuccess();
    } catch (err) {
      setMessage({
        type: "danger",
        text: err.response?.data || "Failed to update license",
      });
    } finally {
      setLoading(false);
    }
  };

  const disabledFullFields = mode === "LIMITED";

  return (
    <div className="card shadow-sm mt-3">
      <div className="card-body">
        <h6 className="mb-3">
          {mode === "LIMITED"
            ? "Update License Dates"
            : "Submit / Update License"}
        </h6>

        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">License Number</label>
            <input
              className="form-control"
              name="licenseNumber"
              value={form.licenseNumber}
              disabled={disabledFullFields}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dateOfBirth"
              value={form.dateOfBirth}
              disabled={disabledFullFields}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Issue Date</label>
            <input
              type="date"
              className="form-control"
              name="issueDate"
              value={form.issueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Expiry Date</label>
            <input
              type="date"
              className="form-control"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">License Type</label>
            <select
              className="form-select"
              name="licenseType"
              value={form.licenseType}
              disabled={disabledFullFields}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="LMV">LMV</option>
              <option value="MCWG">MCWG</option>
              <option value="HMV">HMV</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save License"}
          </button>
        </form>
      </div>
    </div>
  );
}
