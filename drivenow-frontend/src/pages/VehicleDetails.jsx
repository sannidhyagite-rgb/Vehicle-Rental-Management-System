import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getVehicleById } from '../api/vehicleApi';

function VehicleDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [loading, setLoading] = useState(true);

  // Added to fix missing variable ref in booking-backend code
  const reviews = [
    { id: 1, name: "John Doe", rating: 5, comment: "Great car!", date: "2024-01-15" },
    { id: 2, name: "Jane Smith", rating: 4, comment: "Smooth ride.", date: "2024-02-01" }
  ];

  useEffect(() => {
    // If data is passed via navigation state, use it (optimization)
    if (location.state && location.state.id) {
      setVehicle({
        ...location.state,
        year: location.state.year || 2024,
        fuel: location.state.type || 'Standard', // Mapping 'type' from Card to 'fuel'
        transmission: 'Automatic', // Placeholder
        seats: 5, // Placeholder
        description: 'Experience the ultimate driving pleasure with this premium vehicle.',
        image: location.state.image
      });
      setLoading(false);
    } else {
      // Otherwise fetch from API
      const fetchVehicle = async () => {
        try {
          const response = await getVehicleById(id);
          const data = response.data;
          setVehicle({
            id: data.id,
            name: data.company + " " + data.model,
            type: data.fuel,
            rating: 4.8,
            price: data.ratePerDay,
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", // Placeholder
            year: data.year,
            fuel: data.fuel,
            transmission: data.transmission,
            seats: data.seats,
            vehicleLocation: data.address + ", " + data.city,
            city: data.city,
            address: data.address,
            company: data.company,
            model: data.model
          });
        } catch (error) {
          console.error("Error fetching vehicle details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchVehicle();
    }
  }, [id, location.state]);

  const handleBookNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to book a vehicle");
      navigate("/login");
      return;
    }

    // Navigate to Booking Info page
    navigate("/booking-info", {
      state: {
        vehicleId: vehicle.id,
        vehicleModel: vehicle.name,
        ratePerDay: vehicle.price,
        vehicleLocation: vehicle.city ? `${vehicle.address}, ${vehicle.city}` : "Location not available"
      }
    }); // End navigate
  };

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} />
    </div>
  );

  if (!vehicle) return (
    <div className="container mt-5 text-center">
      <h3>Vehicle not found</h3>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Go Home</button>
    </div>
  );

  return (
    <main className="container my-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4">← Back</button>

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
              <span className="badge bg-warning text-dark fs-5 fw-bold"> {vehicle.rating}</span>
            </div>
          </div>

          {/* ✅ REVIEWS BUTTON - Below image */}
          <div className="mt-4 text-center">
            <button
              className="btn btn-outline-primary btn-lg px-4"
              onClick={() => setShowReviews(true)}
            >
              View Customer Reviews ({reviews.length})
            </button>
          </div>
        </div>


        {/* Details Panel */}
        <div className="col-lg-5">
          <h1 className="display-5 fw-bold mb-3">{vehicle.name}</h1>
          <p className="text-muted mb-4">{vehicle.type}</p>

          <div className="bg-primary text-white p-4 rounded-4 mb-4 shadow">
            <h1 className="fw-bold mb-0">₹{vehicle.price}</h1>
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
            <button className="btn btn-primary btn-lg" onClick={handleBookNow}>Book Now</button>
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
