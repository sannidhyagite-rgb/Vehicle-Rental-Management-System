// src/components/home/WhyChoose.jsx
import React from "react";

function WhyChoose() {
  return (
    <section className="why">
      <h2 className="section-title">Why Choose RentEase?</h2>
      <p className="section-subtitle">
        Experience hassle-free car rental with our premium services
      </p>

      <div className="why-grid">
        <div className="why-item">
          <div className="why-icon-circle">🛡️</div>
          <h3>Fully Insured</h3>
          <p>
            All our vehicles come with comprehensive insurance coverage for your
            peace of mind.
          </p>
        </div>

        <div className="why-item">
          <div className="why-icon-circle">⏰</div>
          <h3>24/7 Support</h3>
          <p>
            Round-the-clock customer support to assist you whenever you need
            help.
          </p>
        </div>

        <div className="why-item">
          <div className="why-icon-circle">⭐</div>
          <h3>Premium Fleet</h3>
          <p>
            Choose from our collection of well-maintained, modern vehicles.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
