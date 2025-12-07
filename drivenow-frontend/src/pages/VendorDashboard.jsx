// src/pages/VendorDashboard.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = [
    { id: 1, label: "Total Vehicles", value: 12, change: "+2", icon: "🚗" },
    { id: 2, label: "Bookings Today", value: 8, change: "+15%", icon: "📅" },
    { id: 3, label: "Revenue This Month", value: "$2,450", change: "+28%", icon: "💰" },
    { id: 4, label: "Avg Rating", value: "4.8⭐", change: null, icon: "⭐" }
  ];

  const recentBookings = [
    { id: 1, customer: "John Doe", vehicle: "BMW X5", date: "Today 2:30PM", status: "Active", amount: "$89" },
    { id: 2, customer: "Sarah Kim", vehicle: "Tesla Model 3", date: "Yesterday", status: "Completed", amount: "$79" },
    { id: 3, customer: "Mike Ross", vehicle: "Mercedes C-Class", date: "Dec 5", status: "Pending", amount: "$95" }
  ];

  const quickActions = [
    { id: 1, label: "Add New Vehicle", icon: "plus-circle", path: "/vendor/vehicles/add", color: "primary" },
    { id: 2, label: "View Bookings", icon: "list", path: "/vendor/bookings", color: "info" },
    { id: 3, label: "Earnings Report", icon: "chart-bar", path: "/vendor/earnings", color: "success" }
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4" href="#">
            🚗 Vendor Panel
          </a>
          <div className="d-flex align-items-center">
            <span className="badge bg-light text-dark me-3">John's Auto</span>
            <div className="dropdown">
              <a className="dropdown-toggle text-white text-decoration-none" href="#" role="button" data-bs-toggle="dropdown">
                👤 Profile
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/vendor/profile">Profile</a></li>
                <li><a className="dropdown-item" href="/vendor/settings">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/logout">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav className="col-md-3 col-lg-2 d-md-block bg-white sidebar shadow-sm">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'overview' ? 'active bg-primary text-white' : ''}`} 
                     onClick={() => setActiveTab('overview')}>
                    📊 Overview
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'vehicles' ? 'active bg-primary text-white' : ''}`} 
                     onClick={() => setActiveTab('vehicles')}>
                    🚗 My Vehicles
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'bookings' ? 'active bg-primary text-white' : ''}`} 
                     onClick={() => setActiveTab('bookings')}>
                    📋 Bookings
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'earnings' ? 'active bg-primary text-white' : ''}`} 
                     onClick={() => setActiveTab('earnings')}>
                    💰 Earnings
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
            {activeTab === "overview" && (
              <div>
                {/* Stats Cards */}
                <div className="row mb-5 g-4">
                  {stats.map((stat) => (
                    <div key={stat.id} className="col-xl-3 col-md-6">
                      <div className="card h-100 border-0 shadow-sm hover-lift">
                        <div className="card-body text-center p-4">
                          <div className="display-1 text-primary mb-3 opacity-75">{stat.icon}</div>
                          <h3 className="card-title fw-bold text-dark mb-1">{stat.value}</h3>
                          <p className="text-muted mb-2">{stat.label}</p>
                          {stat.change && (
                            <span className="badge bg-success">
                              {stat.change}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="row mb-5">
                  <div className="col-12">
                    <h4 className="fw-bold mb-4">Quick Actions</h4>
                    <div className="row g-3">
                      {quickActions.map((action) => (
                        <div key={action.id} className="col-md-4">
                          <a href={action.path} className={`card border-0 shadow-sm h-100 text-decoration-none text-center p-4 hover-lift ${action.color}`}>
                            <i className={`fas fa-${action.icon} display-4 mb-3 opacity-75`}></i>
                            <h5 className="fw-bold mb-0">{action.label}</h5>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="row">
                  <div className="col-12">
                    <h4 className="fw-bold mb-4">Recent Bookings</h4>
                    <div className="card border-0 shadow-sm">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Customer</th>
                              <th>Vehicle</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentBookings.map((booking) => (
                              <tr key={booking.id}>
                                <td>{booking.customer}</td>
                                <td>{booking.vehicle}</td>
                                <td>{booking.date}</td>
                                <td>
                                  <span className={`badge ${booking.status === 'Active' ? 'bg-warning' : 'bg-success'}`}>
                                    {booking.status}
                                  </span>
                                </td>
                                <td><strong>${booking.amount}</strong></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          height: calc(100vh - 56px);
          position: sticky;
          top: 56px;
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        .nav-link {
          border-radius: 8px;
          margin: 4px 12px;
          padding: 12px 16px;
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          background-color: #e3f2fd;
          color: #1976d2 !important;
        }
      `}</style>
    </div>
  );
}

export default VendorDashboard;
