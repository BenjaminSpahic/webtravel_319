// src/components/TravelCard.js

import React from 'react';

// Komponenta za prikaz pojedinačnog putovanja
const TravelCard = ({ travel }) => (
  <div className="travel-card">
    <h3>{travel.name}</h3>
    <p>{travel.description}</p>
  </div>
);

export default TravelCard;
