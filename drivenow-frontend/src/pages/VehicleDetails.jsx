// src/pages/VehicleDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function VehicleDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [vehicle, setVehicle] = useState(null);
  const [showReviews, setShowReviews] = useState(false); // ✅ Reviews modal state

  useEffect(() => {
    const passedData = location.state;
    if (passedData) {
      setVehicle({
        ...passedData,
        year: passedData.year || 2023,
        fuel: passedData.fuel || 'Petrol',
        transmission: passedData.transmission || 'Automatic',
        seats: passedData.seats || 5,
        mileage: passedData.mileage || '12,000 km'
      });
    }
  }, [location.state]);

  if (!vehicle) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}} />
    </div>
  );

  // ✅ Mock reviews data
  const reviews = [
    { id: 1, name: "John D.", rating: 5, comment: "Amazing SUV! Perfect for family trips.", date: "Dec 2025" },
    { id: 2, name: "Sarah K.", rating: 4, comment: "Great handling and comfortable ride.", date: "Nov 2025" },
    { id: 3, name: "Mike R.", rating: 5, comment: "Luxury at affordable price. Highly recommend!", date: "Oct 2025" }
  ];

  return (
    <main className="container my-5">
      <a href="/customerdashboard" className="btn btn-outline-secondary mb-4">← Back</a>
      
      <div className="row g-5">
        {/* Main Image + Reviews Button */}
        <div className="col-lg-7">
          <div className="position-relative">
            <img 
              src={vehicle.image} 
              className="img-fluid rounded-4 shadow-lg w-100" 
              alt={vehicle.name}
              style={{ height: "450px", objectFit: 'cover' }}
            />
            <div className="position-absolute top-3 end-0 p-3">
              <span className="badge bg-warning text-dark fs-5 fw-bold">⭐ {vehicle.rating}</span>
            </div>
          </div>
          
          {/* ✅ REVIEWS BUTTON - Below image */}
          <div className="mt-4 text-center">
            <button 
              className="btn btn-outline-primary btn-lg px-4"
              onClick={() => setShowReviews(true)}
            >
              🗨️ View Customer Reviews ({reviews.length})
            </button>
          </div>
        </div>
        
        {/* Details Panel */}
        <div className="col-lg-5">
          <h1 className="display-5 fw-bold mb-3">{vehicle.name}</h1>
          <p className="text-muted mb-4">{vehicle.type}</p>
          
          <div className="bg-primary text-white p-4 rounded-4 mb-4 shadow">
            <h1 className="fw-bold mb-0">${vehicle.price}</h1>
            <small className="lead">per day</small>
          </div>
          
          {/* Specs */}
          <div className="row g-3 mb-5">
            <div className="col-6"><strong>Year:</strong> {vehicle.year}</div>
            <div className="col-6"><strong>Fuel:</strong> {vehicle.fuel}</div>
            <div className="col-6"><strong>Gearbox:</strong> {vehicle.transmission}</div>
            <div className="col-6"><strong>Seats:</strong> {vehicle.seats}</div>
          </div>
          
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg">Book Now</button>
            <button className="btn btn-outline-secondary btn-lg">Contact Owner</button>
          </div>
        </div>
      </div>

      {/* ✅ REVIEWS MODAL */}
      {showReviews && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Customer Reviews</h5>
                <button 
                  className="btn-close" 
                  onClick={() => setShowReviews(false)}
                />
              </div>
              <div className="modal-body p-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-bottom pb-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong>{review.name}</strong>
                      <span className="text-warning">⭐ {review.rating}</span>
                    </div>
                    <p className="text-muted mb-1">{review.comment}</p>
                    <small className="text-muted">{review.date}</small>
                  </div>
                ))}
              </div>
              <div className="modal-footer border-0">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowReviews(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default VehicleDetails;
