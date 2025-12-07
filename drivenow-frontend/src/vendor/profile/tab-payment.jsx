// src/vendor/profile/tab-payment.jsx

import React, { useState } from "react";

export default function TabPayment({ vendor, payouts = [] }) {
  const [methods, setMethods] = useState(vendor.payoutMethods || []);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ type: "bank", label: "", details: "" });

  const addMethod = e => {
    e.preventDefault();
    const newM = { id: Date.now(), ...form };
    setMethods([...methods, newM]);
    setShowAdd(false);
    setForm({ type: "bank", label: "", details: "" });
  };

  const remove = id => setMethods(methods.filter(m => m.id !== id));

  return (
    <div>
      <div className="panel">
        <div className="panel-header">
          <h3>Payment Methods</h3>
          <div>
            <button className="btn btn-primary" onClick={() => setShowAdd(s => !s)}>
              + Add New Payout
            </button>
          </div>
        </div>

        <div className="payout-list">
          {methods.map(m => (
            <div key={m.id} className="payout-item">
              <div>
                <strong>{m.type === "upi" ? `UPI — ${m.label}` : m.label}</strong>
                <div className="muted">{m.details}</div>
              </div>
              <div className="item-actions">
                <button className="btn">Edit</button>
                <button className="btn ghost" onClick={() => remove(m.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAdd && (
        <div className="panel">
          <h4>Add payout method</h4>
          <form onSubmit={addMethod} className="add-payout-form">
            <label>
              Type
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="bank">Bank Account</option>
                <option value="upi">UPI</option>
              </select>
            </label>
            <label>
              Label (Bank name or UPI ID)
              <input value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} />
            </label>
            <label>
              Details (IFSC / Account or UPI ID)
              <input value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} />
            </label>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-primary" type="submit">Save</button>
              <button type="button" className="btn" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="panel">
        <h3>Payout History</h3>
        <table className="table">
          <thead><tr><th>Date</th><th>Method</th><th>Amount</th><th>Status</th><th /></tr></thead>
          <tbody>
            {payouts.map(p => (
              <tr key={p.id}>
                <td>{p.date}</td>
                <td>{p.method}</td>
                <td>₹{p.amount}</td>
                <td><span className={`status ${p.status}`}>{p.status}</span></td>
                <td><button className="btn">Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
