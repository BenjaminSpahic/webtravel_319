// src/components/Footer.js
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // ✅ Ikonice društvenih mreža

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2025 Turistički Portal. Sva prava zadržana.</p>
      <p style={styles.text}>📍 Zenica, Bosna i Hercegovina | 📧 kontakt@turizam.ba</p>
      <div style={styles.socialIcons}>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaInstagram />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
};

//  Stilovi za footer
const styles = {
  footer: {
    background: "#0077b6",
    color: "white",
    textAlign: "center",
    padding: "20px",
    marginTop: "30px",
    borderTop: "3px solid #0056b3",
  },
  text: {
    margin: "5px 0",
    fontSize: "14px",
  },
  socialIcons: {
    marginTop: "10px",
  },
  icon: {
    color: "white",
    fontSize: "20px",
    margin: "0 10px",
    textDecoration: "none",
  },
};

export default Footer;
