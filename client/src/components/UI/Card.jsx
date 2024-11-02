import React from "react";
import "./Card.css";

const Card = ({ name, des, img, page }) => {
  const handleDonateClick = () => {
    window.open(page, "_blank"); // Opens the link in a new tab
  };

  return (
    <div className="partner-card">
      <img src={img} alt="Ngo pic" />
      <div className="card-content">
        <h2 className="card-heading">{name}</h2>
        <p className="card-description">{des}</p>
        <button className="btn-card" onClick={handleDonateClick}>
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default Card;
