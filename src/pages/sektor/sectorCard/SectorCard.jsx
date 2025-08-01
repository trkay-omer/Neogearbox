import React from "react";
import "./SectorCard.scss";

const SectorCard = ({ image, title, usageAreas, description }) => {
  return (
    <div className="sector-card">
      <div className="sector-card__image">
        <img src={image} alt={title} />
      </div>

      <div className="sector-card__content">
        <div className="sector-card__header">
          <h2 className="sector-card__title">{title}</h2>
        </div>

        <ul className="sector-card__features">
          {usageAreas.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <p className="sector-card__description">{description}</p>
      </div>
    </div>
  );
};

export default SectorCard;
