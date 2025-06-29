import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaInfoCircle, FaDollarSign, FaGlobe, FaShieldAlt } from "react-icons/fa";
import Hero from "../components/Hero"; // ✅ Import Hero sekcije

const HomePage = () => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/travels");
        setTravels(response.data);
      } catch (error) {
        console.error("❌ Greška pri dohvatanju putovanja:", error);
        alert("Došlo je do greške pri dohvatanju liste putovanja.");
      }
    };

    fetchTravels();
  }, []);

  return (
    <div>
      {/*  Hero sekcija na vrhu stranice */}
      <Hero />

      {/*  "O nama" sekcija */}
      <section className="about-section">
        <h2>O nama</h2>
        <p>
          Dobrodošli na naš turistički portal! Nudimo najbolje putne aranžmane 
          po najpovoljnijim cijenama. Uživajte u sigurnom i nezaboravnom putovanju!
        </p>

        <div className="about-benefits">
          <div className="benefit">
            <FaDollarSign className="icon" />
            <h3>Povoljne cijene</h3>
            <p>Garantujemo najniže cijene za nezaboravna putovanja.</p>
          </div>

          <div className="benefit">
            <FaShieldAlt className="icon" />
            <h3>Sigurno putovanje</h3>
            <p>Sarađujemo samo sa provjerenim agencijama i hotelima.</p>
          </div>

          <div className="benefit">
            <FaGlobe className="icon" />
            <h3>Veliki izbor</h3>
            <p>Putujte širom svijeta i istražujte nove destinacije.</p>
          </div>
        </div>
      </section>

      {/*  Lista dostupnih putovanja */}
      <div style={styles.container}>
        <h2 style={styles.heading}>Dostupna Putovanja</h2>

        {travels.length === 0 ? (
          <p style={styles.noTravels}>Trenutno nema dostupnih putovanja.</p>
        ) : (
          <div style={styles.travelList}>
            {travels.map((travel, index) => (
              <div
                key={travel.id}
                style={{
                  ...styles.travelCard,
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e0e0e0",
                }}
              >
                <h3>{travel.name}</h3>
                <p>
                  <FaMapMarkerAlt style={styles.icon} /> <strong>Destinacija:</strong> {travel.destination}
                </p>
                <p>
                  <FaInfoCircle style={styles.icon} /> <strong>Opis:</strong> {travel.description}
                </p>
                <p>
                  <FaDollarSign style={styles.icon} /> <strong>Cijena:</strong> ${travel.price}
                </p>

                <Link to={`/travel/${travel.id}`}>
                  <button style={styles.button}>Detalji putovanja</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

//   stilovi
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#007bff",
  },
  noTravels: {
    fontSize: "18px",
    color: "#555",
  },
  travelList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  travelCard: {
    width: "300px",
    padding: "15px",
    margin: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
  },
  icon: {
    marginRight: "8px",
    color: "#007bff",
  },
  button: {
    backgroundColor: "#0275d8",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
    transform: "scale(1.05)",
  },
};

export default HomePage;
