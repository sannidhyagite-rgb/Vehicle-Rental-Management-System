// src/vendor/vehicles/AddVehicle.jsx
import React, { useState } from "react";
import "./add-vehicle.css";

const FEATURES = {
  Safety: [
    { code: "ABS", label: "Anti-lock Braking System (ABS)" },
    { code: "TC", label: "Traction Control" },
    { code: "ADAS", label: "ADAS" },
    { code: "AIRBAG_FRONT", label: "2 Front Airbags" },
    { code: "AIRBAG_SIDE", label: "2 Side Airbags" },
    { code: "AIRBAG_REAR", label: "2 Rear Airbags" },
    { code: "AIRBAG_6", label: "6 Airbags" },
    { code: "REVERSE_CAM", label: "Reverse Camera" },
  ],
  Comfort: [
    { code: "AC", label: "Air Conditioning" },
    { code: "POWER_STEER", label: "Power Steering" },
    { code: "POWER_WIN", label: "Power Windows" },
    { code: "SUNROOF", label: "Sunroof" },
    { code: "PAN_SUNROOF", label: "Panoramic Sunroof" },
    { code: "AIR_PURIFIER", label: "Air Purifier" },
    { code: "BOOT_SPACE", label: "Full Boot Space" },
  ],
  Technology: [
    { code: "BT", label: "Bluetooth" },
    { code: "MUSIC", label: "Music System" },
    { code: "USB", label: "USB Charger" },
    { code: "VOICE", label: "Voice Control" },
    { code: "ORVM", label: "Electric ORVM" },
  ],
  Convenience: [
    { code: "KEYLESS", label: "Keyless Entry" },
    { code: "PUSH_START", label: "Push Button Start" },
    { code: "CRUISE", label: "Cruise Control" },
    { code: "TOOLKIT", label: "Toolkit" },
    { code: "SPARE", label: "Spare Tyre" },
    { code: "FRESHENER", label: "Air Freshener" },
  ],
};

export default function AddVehicle() {
  const [form, setForm] = useState({
    company: "",
    model: "",
    year: "",
    transmission: "",
    fuel: "",
    seats: "",
    ratePerDay: "",
    description: "",

    // images
    vehicleImages: [],

    // Admin / verification
    registrationNumber: "",
    rcNumber: "",
    insuranceExpiry: "",
    pucExpiry: "",
    chassisLast4: "",
    engineNumber: "",

    features: [],
  });

  const toggleFeature = (code) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(code)
        ? prev.features.filter((f) => f !== code)
        : [...prev.features, code],
    }));
  };

  const handleChange = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  return (
    <div className="vendor-page-shell">
      <div className="vendor-container">
        <h1>Add New Vehicle</h1>
        <p className="subtitle">Enter vehicle details and features</p>

        <div className="two-col">
          {/* ================= FORM ================= */}
          <form className="panel form-panel">
            <h4>Vehicle Information</h4>

            <label>
              Company (Make)
              <input value={form.company} onChange={handleChange("company")} />
            </label>

            <label>
              Model
              <input value={form.model} onChange={handleChange("model")} />
            </label>

            <label>
              Year
              <input type="number" value={form.year} onChange={handleChange("year")} />
            </label>

            <label>
              Transmission
              <select value={form.transmission} onChange={handleChange("transmission")}>
                <option value="" disabled>Choose</option>
                <option>Manual</option>
                <option>Automatic</option>
              </select>
            </label>

            <label>
              Fuel Type
              <select value={form.fuel} onChange={handleChange("fuel")}>
                <option value="" disabled>Choose</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>CNG</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </label>

            <label>
              Seating Capacity
              <input
                type="number"
                min="1"
                placeholder="e.g. 5"
                value={form.seats}
                onChange={handleChange("seats")}
              />
            </label>

            <label>
              Rate per day (₹)
              <input value={form.ratePerDay} onChange={handleChange("ratePerDay")} />
            </label>

            <label>
              Description
              <textarea
                placeholder="Describe your vehicle..."
                value={form.description}
                onChange={handleChange("description")}
              />
            </label>

            {/* ===== Vehicle Images ===== */}
            <div className="image-upload-section">
              <h4>Vehicle Images</h4>
              <p className="hint-text">
                Upload clear photos (front, side, interior). Recommended: 3–8 images.
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setForm({
                    ...form,
                    vehicleImages: Array.from(e.target.files),
                  })
                }
              />

              {form.vehicleImages.length > 0 && (
                <div className="image-preview-grid">
                  {form.vehicleImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(img)}
                      alt="vehicle preview"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ===== Admin / Verification ===== */}
            <details className="verification-box">
              <summary>Vehicle Verification (Admin Only)</summary>

              <label>
                Registration Number
                <input
                  placeholder="MH12AB1234"
                  value={form.registrationNumber}
                  onChange={handleChange("registrationNumber")}
                />
              </label>

              <label>
                RC Number
                <input value={form.rcNumber} onChange={handleChange("rcNumber")} />
              </label>

              <label>
                Insurance Expiry Date
                <input
                  type="date"
                  value={form.insuranceExpiry}
                  onChange={handleChange("insuranceExpiry")}
                />
              </label>

              <label>
                PUC Expiry Date
                <input
                  type="date"
                  value={form.pucExpiry}
                  onChange={handleChange("pucExpiry")}
                />
              </label>

              <label>
                Chassis Number (Last 4 digits)
                <input
                  maxLength="4"
                  value={form.chassisLast4}
                  onChange={handleChange("chassisLast4")}
                />
              </label>

              <label>
                Engine Number (Optional)
                <input
                  value={form.engineNumber}
                  onChange={handleChange("engineNumber")}
                />
              </label>
            </details>

            <br />

            <button className="btn btn-primary" type="button">
              Save Vehicle
            </button>
          </form>

          {/* ================= FEATURES ================= */}
          <div className="panel features-panel">
            <h4>Features</h4>

            {Object.entries(FEATURES).map(([category, items]) => (
              <div key={category} className="feature-section">
                <h5 className="feature-title">{category}</h5>
                <div className="features-grid">
                  {items.map((f) => (
                    <label
                      key={f.code}
                      className={`feature-pill ${
                        form.features.includes(f.code) ? "active" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.features.includes(f.code)}
                        onChange={() => toggleFeature(f.code)}
                      />
                      <span>{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
