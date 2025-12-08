// src/vendor/profile/tab-security.jsx

import React, { useState } from "react";

export default function TabSecurity({ vendor, data = [] }) {
  const [pwd, setPwd] = useState({ current: "", newPwd: "", confirm: "" });

  const handlePwdUpdate = e => {
    e.preventDefault();
    // client-side validation only for now
    if (pwd.newPwd !== pwd.confirm) return alert("New passwords do not match");
    alert("Password updated (frontend only). Backend integration later.");
    setPwd({ current: "", newPwd: "", confirm: "" });
  };

  return (
    <div>
      <div className="panel">
        <h3>Password & Security</h3>
        <form className="security-form" onSubmit={handlePwdUpdate}>
          <label>
            Current Password
            <input type="password" value={pwd.current} onChange={e => setPwd({ ...pwd, current: e.target.value })} placeholder="Enter current password" />
          </label>
          <label>
            New Password
            <input type="password" value={pwd.newPwd} onChange={e => setPwd({ ...pwd, newPwd: e.target.value })} placeholder="Enter new password" />
          </label>
          <label>
            Confirm New Password
            <input type="password" value={pwd.confirm} onChange={e => setPwd({ ...pwd, confirm: e.target.value })} placeholder="Confirm new password" />
          </label>
          <button className="btn btn-primary" type="submit">Update Password</button>
        </form>
      </div>

      <div className="panel">
        <h3>Two-Factor Authentication</h3>
        <div className="twofa-row">
          <div>
            <strong>SMS Authentication</strong>
            <p>Receive verification codes via text message</p>
          </div>
          <div><button className="btn">Enable</button></div>
        </div>
      </div>

      <div className="panel">
        <h3>Login History</h3>
        <div className="login-list">
          {data.map((d, idx) => (
            <div key={idx} className="login-item">
              <div>
                <div className="login-device">{d.device} • {d.location}</div>
                <div className="login-time">{d.time}</div>
              </div>
              <div>{d.current ? <span className="tag active">Active</span> : <button className="btn">Revoke</button>}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
