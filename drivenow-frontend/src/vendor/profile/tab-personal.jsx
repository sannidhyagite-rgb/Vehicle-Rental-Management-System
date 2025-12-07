// src/vendor/profile/tab-personal.jsx

import React, { useState } from "react";

function Input({ label, value, name, onChange, disabled = true, placeholder="" }) {
  return (
    <label className="form-label">
      <div className="label-title">{label}</div>
      {disabled ? (
        <div className="input-readonly">{value || placeholder}</div>
      ) : (
        <input name={name} defaultValue={value} onChange={onChange} />
      )}
    </label>
  );
}

export default function TabPersonal({ vendor }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...vendor });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const save = () => {
    // For now just disable edit; backend later
    setEditing(false);
    // TODO: send `form` to backend when available
  };

  return (
    <div>
      <div className="panel personal-panel">
        <div className="panel-header">
          <h3>Personal Information</h3>
          <div>
            {!editing ? (
              <button className="btn" onClick={() => setEditing(true)}>Edit</button>
            ) : (
              <>
                <button className="btn btn-primary" onClick={save}>Save</button>
                <button className="btn" onClick={() => { setEditing(false); setForm({ ...vendor }); }}>Cancel</button>
              </>
            )}
          </div>
        </div>

        <div className="form-grid">
          <Input label="Vendor Name" name="name" value={form.name} onChange={handleChange} disabled={!editing} />
          <Input label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} disabled={!editing} />
          <Input label="Email Address" name="email" value={form.email} onChange={handleChange} disabled={!editing} />
          <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} disabled={!editing} />
          <Input label="Business Address" name="address" value={form.address} onChange={handleChange} disabled={!editing} />
          <Input label="GST / Tax ID" name="gst" value={form.gst} onChange={handleChange} disabled={!editing} />
          <Input label="UPI ID" name="upi" value={form.upi} onChange={handleChange} disabled={!editing} />
          <Input label="Bank (short)" name="bankShort" value={form.bankShort} onChange={handleChange} disabled={!editing} />
        </div>
      </div>

      <div className="panel stats-panel">
        <h3>Account Statistics</h3>
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-num">{vendor.totalVehicles}</div>
            <div className="stat-label">Total Vehicles</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">₹{vendor.totalEarnings.toLocaleString()}</div>
            <div className="stat-label">Total Earned</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{vendor.loyaltyPoints || 0}</div>
            <div className="stat-label">Loyalty Points</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{vendor.rating || "—"}</div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
