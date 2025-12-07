// src/components/layout/Hero.jsx
import React from "react";
import SearchForm from "../home/SearchForm";
import VendorRegisterButton from "../home/VendorRegisterButton";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Find Your Perfect Rental</h1>
        <p className="hero-subtitle">
          Choose from our premium fleet of vehicles for any occasion
        </p>
        <VendorRegisterButton />
        <SearchForm />
      </div>
    </section>
  );
}

export default Hero;
