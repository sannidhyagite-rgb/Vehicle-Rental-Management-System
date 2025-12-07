// src/vendor/profile/ProfileTabs.jsx

import React, { useState } from "react";
import "./vendor-profile.css";
import TabPersonal from "./tab-personal";
import TabSecurity from "./tab-security";
import TabPayment from "./tab-payment";
import TabPreferences from "./tab-preferences";

export default function ProfileTabs({ vendor, data }) {
  const tabs = ["Personal Info", "Security", "Payment", "Preferences"];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="tabs">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`tab ${active === i ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {active === 0 && <TabPersonal vendor={vendor} />}
        {active === 1 && <TabSecurity vendor={vendor} data={data.loginHistory} />}
        {active === 2 && <TabPayment vendor={vendor} payouts={data.payouts} />}
        {active === 3 && <TabPreferences vendor={vendor} />}
      </div>
    </div>
  );
}
