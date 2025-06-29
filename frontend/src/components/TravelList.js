// src/components/TravelList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TravelList = () => {
  const [travels, setTravels] = useState([]);
  const [filteredTravels, setFilteredTravels] = useState([]);
  const [destination, setDestination] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/travels')
      .then(response => {
        setTravels(response.data);
        setFilteredTravels(response.data);
      })
      .catch(error => {
        console.error('❌ Greška pri dohvatanju putovanja:', error);
      });
  }, []);

  // Funkcija za filtriranje putovanja
  const handleFilter = () => {
    let filtered = travels;

    if (destination) {
      filtered = filtered.filter(travel =>
        travel.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter(travel => travel.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(travel => travel.price <= parseFloat(maxPrice));
    }

    setFilteredTravels(filtered);
  };

  return (
    <div className="travel-list-container" style={{ padding: "20px" }}>
      <h1>Dostupna Putovanja</h1>

      {/* Sekcija za filtere */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Pretraga destinacije..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min cijena"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max cijena"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button onClick={handleFilter} className="filter-button">
          Primijeni filtere
        </button>
      </div>

      {/* Lista putovanja */}
      <div className="travel-list">
        {filteredTravels.length === 0 ? (
          <p>Nema dostupnih putovanja za zadate kriterije.</p>
        ) : (
          filteredTravels.map((travel, index) => (
            <div
              key={travel.id}
              className="travel-card"
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e0e0e0",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              {/* Prikaz samo jedne slike */}
              <img
                src={travel.image || 'default.jpg'}
                alt={travel.name}
                className="travel-image"
              />
              <h2>{travel.name}</h2>
              <p><strong>Destinacija:</strong> {travel.destination}</p>
              <p><strong>Cijena:</strong> ${travel.price}</p>

              <Link to={`/travel/${travel.id}`}>
                <button className="details-button">Detalji putovanja</button>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Dugme za povratak na početnu stranicu */}
      <Link to="/">
        <button className="back-button">Povratak na početnu</button>
      </Link>
    </div>
  );
};

export default TravelList;
