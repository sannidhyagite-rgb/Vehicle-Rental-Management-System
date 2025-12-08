// src/vendor/notifications/VendorNotifications.jsx

import React, {useState, useEffect} from "react";
import "./vendor-notifications.css";
import notificationsData from "../data/notifications.json";

export default function VendorNotifications(){
  const [items, setItems] = useState([]);

  useEffect(()=> setItems(notificationsData), []);

  const markRead = id => setItems(items.map(i=> i.id===id?{...i, read:true}:i));
  const del = id => setItems(items.filter(i=> i.id!==id));

  return (
    <div className="vendor-page-shell">
      <div className="vendor-container">
        <h1>Notifications <span className="badge-unread">{items.filter(i=>!i.read).length} unread</span></h1>
        <p className="subtitle">Stay updated with your rental business</p>

        <div className="filter-row">
          <select><option>All Notifications</option></select>
          <div className="spacer" />
          <button className="btn">Mark All as Read</button>
        </div>

        <div className="notifications-list">
          {items.map(n => (
            <div key={n.id} className={"notif-card " + (n.read ? "read" : "")}>
              <div className="notif-left">
                <div className="notif-title">{n.title}</div>
                <div className="notif-body">{n.message}</div>
                <div className="notif-actions">
                  {n.amount && <div className="amount">Amount: ₹{n.amount}</div>}
                  <button className="btn small" onClick={()=>markRead(n.id)}>Mark as Read</button>
                  <button className="btn small ghost" onClick={()=>del(n.id)}>Delete</button>
                </div>
              </div>
              <div className="notif-right">
                <div className="time">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
