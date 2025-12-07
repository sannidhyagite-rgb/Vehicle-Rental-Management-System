import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add navigation
import "bootstrap/dist/css/bootstrap.min.css";

function VendorRegister() {
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Loading state
  const navigate = useNavigate(); // ✅ Navigation hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // ✅ Show loading

    // Simulate API call
    try {
      console.log("Register vendor:", form);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // ✅ Navigate to  Vendor Dashboard on success
      navigate("/vendor-dashboard");
      
    } catch (error) {
      console.error("Registration failed:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5 min-vh-100 d-flex align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  🚗
                </div>
                <h2 className="fw-bold text-dark mb-2">Register as Vendor</h2>
                <p className="text-muted">Join our platform to list your vehicles</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Company Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Contact Person</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="contactName"
                    value={form.contactName}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Phone</label>
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mb-5">
                  <label className="form-label fw-semibold">Base Location</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 py-3 fw-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Registering...
                    </>
                  ) : (
                    "Register Now"
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <small className="text-muted">
                  Already registered? <a href="/vendor/login">Login here</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorRegister;
