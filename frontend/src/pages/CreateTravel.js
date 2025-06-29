// src/pages/CreateTravel.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateTravel = () => {
  const [travel, setTravel] = useState({
    name: "",
    description: "",
    destination: "",
    price: "",
    image: ""
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTravel({ ...travel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Provjera: korisnik mora biti prijavljen i imati administratorska prava
    if (!user || !user.token) {
      alert("Morate biti prijavljeni da biste kreirali putovanje.");
      return;
    }
    if (user.role !== "admin") {
      alert("Samo administratori imaju ovlasti kreirati putovanja.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/travels", travel, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("Putovanje kreirano!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Greška pri kreiranju putovanja:", error);
      alert(error.response?.data?.message || "Greška pri kreiranju putovanja.");
    }
  };

  return (
    <div className="container">
      <h1>Kreiraj novo putovanje</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Naziv putovanja</label>
          <input
            type="text"
            name="name"
            value={travel.name}
            onChange={handleChange}
            placeholder="Unesite naziv putovanja"
            required
          />
        </div>
        <div className="form-group">
          <label>Opis putovanja</label>
          <textarea
            name="description"
            value={travel.description}
            onChange={handleChange}
            placeholder="Unesite opis putovanja"
            required
          />
        </div>
        <div className="form-group">
          <label>Destinacija</label>
          <input
            type="text"
            name="destination"
            value={travel.destination}
            onChange={handleChange}
            placeholder="Unesite destinaciju"
            required
          />
        </div>
        <div className="form-group">
          <label>Cijena</label>
          <input
            type="number"
            name="price"
            value={travel.price}
            onChange={handleChange}
            placeholder="Unesite cijenu"
            required
          />
        </div>
        <div className="form-group">
          <label>URL slike</label>
          <input
            type="text"
            name="image"
            value={travel.image}
            onChange={handleChange}
            placeholder="Unesite URL slike (opcionalno)"
          />
        </div>
        <button type="submit" className="button">
          Kreiraj putovanje
        </button>
      </form>
    </div>
  );
};

export default CreateTravel;
