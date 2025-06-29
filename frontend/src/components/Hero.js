import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div style={styles.heroContainer}>
      <div style={styles.overlay}></div>
      <div style={styles.heroContent}>
        <h1>Otkrijte Svijet Sa Nama! 🌍</h1>
        <p>Pronađite i rezervišite nezaboravna putovanja po najboljim cijenama.</p>
        <Link to="/travels">
          <button style={styles.button}>Pogledaj Putovanja</button>
        </Link>
      </div>
    </div>
  );
};

//  Stilovi za hero sekciju
const styles = {
  heroContainer: {
    position: "relative",
    width: "100%",
    height: "400px",
    backgroundImage: "url('https://source.unsplash.com/1600x900/?travel')", // Nasumična slika putovanja
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Tamni overlay za bolju vidljivost teksta
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "600px",
  },
  button: {
    backgroundColor: "#ffcc00",
    color: "#333",
    padding: "12px 24px",
    fontSize: "18px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
    transition: "all 0.3s ease",
  },
};

export default Hero;
