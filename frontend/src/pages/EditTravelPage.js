// src/pages/EditTravelPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EditTravelPage = () => {
  const { id } = useParams();
  const [travel, setTravel] = useState({
    name: "",
    description: "",
    destination: "",
    price: "",
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/travels/${id}`)
      .then((response) => {
        setTravel(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška pri dohvatanju putovanja:", err);
        setError("Greška pri dohvatanju putovanja.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setTravel({ ...travel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/travels/${id}`, travel, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert("Putovanje uspješno ažurirano!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Greška pri ažuriranju putovanja:", err);
      alert("Greška pri ažuriranju putovanja.");
    }
  };

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Uredi Putovanje</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>Naziv:</label>
        <input
          type="text"
          name="name"
          value={travel.name}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />

        <label>Opis:</label>
        <textarea
          name="description"
          value={travel.description}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "16px", minHeight: "80px" }}
        />

        <label>Destinacija:</label>
        <input
          type="text"
          name="destination"
          value={travel.destination}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />

        <label>Cijena:</label>
        <input
          type="number"
          name="price"
          value={travel.price}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />

        <label>URL slike:</label>
        <input
          type="text"
          name="image"
          value={travel.image}
          onChange={handleChange}
          style={{ padding: "10px", fontSize: "16px" }}
        />

        <button type="submit" style={{ padding: "10px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Sačuvaj promjene
        </button>
      </form>
    </div>
  );
};

export default EditTravelPage;
