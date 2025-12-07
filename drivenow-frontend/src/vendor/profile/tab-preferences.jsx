// src/vendor/profile/tab-preferences.jsx

import React, { useState } from "react";

function Toggle({ label, desc, checked, onChange }) {
  return (
    <div className="pref-row">
      <div>
        <strong>{label}</strong>
        <div className="muted">{desc}</div>
      </div>
      <div>
        <input type="checkbox" checked={checked} onChange={onChange} />
      </div>
    </div>
  );
}

export default function TabPreferences({ vendor }) {
  const [prefs, setPrefs] = useState({
    emailNotif: true,
    smsNotif: false,
    pushNotif: true,
    maintenanceReminders: true,
    publicProfile: true,
    dataSharing: false
  });

  const toggle = key => setPrefs(s => ({ ...s, [key]: !s[key] }));

  return (
    <div>
      <div className="panel">
        <h3>Notification Preferences</h3>
        <Toggle label="Email Notifications" desc="Booking confirmations and updates" checked={prefs.emailNotif} onChange={() => toggle("emailNotif")} />
        <Toggle label="SMS Notifications" desc="Important updates via text message" checked={prefs.smsNotif} onChange={() => toggle("smsNotif")} />
        <Toggle label="Push Notifications" desc="In-app notifications" checked={prefs.pushNotif} onChange={() => toggle("pushNotif")} />
        <Toggle label="Maintenance Reminders" desc="Vehicle maintenance alerts" checked={prefs.maintenanceReminders} onChange={() => toggle("maintenanceReminders")} />
      </div>

      <div className="panel">
        <h3>Privacy Settings</h3>
        <Toggle label="Public Vendor Profile" desc="Allow others to see your vendor profile" checked={prefs.publicProfile} onChange={() => toggle("publicProfile")} />
        <Toggle label="Data Sharing" desc="Share data with partners for better service" checked={prefs.dataSharing} onChange={() => toggle("dataSharing")} />
      </div>

      <div className="panel danger">
        <h3>Danger Zone</h3>
        <p>Permanently delete your account and all data. This action cannot be undone.</p>
        <button className="btn danger">Delete Account</button>
      </div>
    </div>
  );
}
