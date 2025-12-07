// src/vendor/vehicles/AddVehicle.jsx

import React, {useState} from "react";
import "./add-vehicle.css";

export default function AddVehicle(){
  const [form, setForm] = useState({
    name:"", year:"", type:"", fuel:"", ratePerDay:"", description:"", features:[]
  });

  const featuresList = ["Air Conditioning","Bluetooth","GPS Navigation","Heated Seats","Sunroof","Leather Seats","Backup Camera","Cruise Control","Parking Sensors","Apple CarPlay","Android Auto","All-Wheel Drive","Keyless Entry"];

  const toggleFeature = feat => {
    setForm(s => {
      const has = s.features.includes(feat);
      return { ...s, features: has ? s.features.filter(f => f!==feat) : [...s.features, feat] }
    });
  };

  return (
    <div className="vendor-page-shell">
      <div className="vendor-container">
        <div className="page-header">
          <div>
            <h1>Add New Vehicle</h1>
            <p className="subtitle">Enter vehicle details and features</p>
          </div>
        </div>

        <div className="two-col">
          <form className="panel form-panel" onSubmit={(e)=>e.preventDefault()}>
            <label>Vehicle Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></label>
            <label>Year<input value={form.year} onChange={e=>setForm({...form,year:e.target.value})} /></label>
            <label>Type<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Choose</option><option>SUV</option><option>Electric</option><option>Luxury</option></select></label>
            <label>Fuel<select value={form.fuel} onChange={e=>setForm({...form,fuel:e.target.value})}><option>Choose</option><option>Gasoline</option><option>Electric</option></select></label>
            <label>Rate per day<input value={form.ratePerDay} onChange={e=>setForm({...form,ratePerDay:e.target.value})} /></label>

            <label>Description<textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Describe your vehicle..." /></label>

            <button className="btn btn-primary" type="submit">Save Vehicle</button>
          </form>

          <div className="panel features-panel">
            <h4>Features</h4>
            <div className="features-grid">
              {featuresList.map(feat => (
                <label key={feat} className={"feature-pill " + (form.features.includes(feat) ? "active" : "")}>
                  <input type="checkbox" checked={form.features.includes(feat)} onChange={()=>toggleFeature(feat)} />
                  <span>{feat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
