// src/components/home/VehicleCard.jsx
import React from "react";

function VehicleCard({ name, type, rating, price, tags, imageClass }) {
  return (
    <article className="vehicle-card">
      <div className={`vehicle-image ${imageClass}`} />
      <div className="vehicle-body">
        <div className="vehicle-header">
          <h3>{name}</h3>
          <span className="rating">⭐ {rating}</span>
        </div>
        <p className="vehicle-type">{type}</p>

        <div className="tag-row">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="vehicle-footer">
          <span className="price">
            <span className="price-main">${price}</span>/day
          </span>
          <button className="btn btn-dark">View Details</button>
        </div>
      </div>
    </article>
  );
}

export default VehicleCard;
