// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [travels, setTravels] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorTravels, setErrorTravels] = useState("");
  const [errorUsers, setErrorUsers] = useState("");

  // Dohvati token iz localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;

  useEffect(() => {
    // 1. Dohvatanje putovanja
    axios
      .get("/api/travels", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTravels(response.data))
      .catch((error) => {
        console.error("Greška pri dohvatanju putovanja:", error);
        setErrorTravels("Došlo je do greške pri dohvatanju putovanja.");
      });

    // 2. Dohvatanje korisnika
    axios
      .get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Greška pri dohvatanju korisnika:", error);
        setErrorUsers("Došlo je do greške pri dohvatanju korisnika.");
      });
  }, [token]);

  // Funkcija za brisanje korisnika
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Da li ste sigurni da želite obrisati korisnika?")) {
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        alert("Korisnik uspješno obrisan!");
        setUsers(users.filter((u) => u.id !== userId)); // Ažuriraj tabelu
      }
    } catch (error) {
      console.error("❌ Greška pri brisanju korisnika:", error);
      alert("Ne mogu obrisati korisnika.");
    }
  };
  

  return (
    <div className="admin-container">
      <h1>Administratorska Kontrolna Ploča</h1>

      {/* Upravljanje putovanjima */}
      <section className="admin-section">
        <h2>Upravljanje Putovanjima</h2>
        <Link to="/admin/travel/create" className="create-button">
          Kreiraj novo putovanje
        </Link>

        {errorTravels && <p className="error-text">{errorTravels}</p>}

        {travels.length === 0 ? (
          <p>Nema dostupnih putovanja.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Opis</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {travels.map((travel) => (
                <tr key={travel.id}>
                  <td>{travel.name}</td>
                  <td>{travel.description}</td>
                  <td>
                    <Link
                      to={`/admin/travel/edit/${travel.id}`}
                      className="edit-button"
                    >
                      Uredi
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Upravljanje korisnicima */}
      <section className="admin-section">
        <h2>Upravljanje Korisnicima</h2>
        {errorUsers && <p className="error-text">{errorUsers}</p>}

        {users.length === 0 ? (
          <p>Trenutno nema korisnika.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ime</th>
                <th>Uloga</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Obriši
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
