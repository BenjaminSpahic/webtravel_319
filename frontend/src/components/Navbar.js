// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle, FaPlane, FaHome, FaList, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>
        <FaPlane style={styles.icon} /> Turistički Portal
      </h2>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>
            <FaHome style={styles.icon} /> Početna
          </Link>
        </li>
        <li>
          <Link to="/travels" style={styles.link}>
            <FaList style={styles.icon} /> Pogledaj putovanja
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/user" style={styles.link}>
                <FaUserCircle style={styles.icon} /> {user.name}
              </Link>
            </li>
            {user.role === "admin" && (
              <>
                <li>
                  <Link to="/admin" style={styles.link}>
                    Admin Panel
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/my-bookings" style={styles.link}>
                📖 Moje rezervacije
              </Link>
            </li>
            <li>
              <button onClick={logoutHandler} style={styles.button}>
                <FaSignOutAlt style={styles.icon} /> Odjava
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" style={styles.link}>
                <FaSignInAlt style={styles.icon} /> Prijava
              </Link>
            </li>
            <li>
              <Link to="/register" style={styles.link}>
                <FaUserPlus style={styles.icon} /> Registracija
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0077b6",
    padding: "15px 20px",
    color: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  navLinks: {
    listStyleType: "none",
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    transition: "color 0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  button: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  icon: {
    fontSize: "18px",
    verticalAlign: "middle",
  },
};

export default Navbar;
