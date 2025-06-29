import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaMoneyBillWave, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!storedUser) {
      setError("Morate biti prijavljeni.");
      return;
    }

    // Dohvati informacije o korisniku
    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${storedUser.token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setError("Ne možemo dohvatiti informacije o korisniku. Provjerite backend."));

    // Dohvati rezervacije
    axios
      .get("http://localhost:5000/api/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${storedUser.token}` },
      })
      .then((res) => setBookings(res.data))
      .catch(() => setError("Greška pri dohvatanju rezervacija."));
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Korisnička Kontrolna Ploča</h2>
      
      {error && <p className="error-text">{error}</p>}

      {user && (
        <div className="user-info">
          <p><strong>Ime:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Uloga:</strong> {user.role === "admin" ? "Administrator" : "Korisnik"}</p>
        </div>
      )}

      <h3 className="reservations-title">Vaše Rezervacije</h3>
      {bookings.length === 0 ? (
        <p>Nema aktivnih rezervacija.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking, index) => (
            <div key={index} className={`booking-card ${booking.status === "canceled" ? "canceled" : ""}`}>
              <h3>{booking.travel_name || "Nepoznato putovanje"}</h3>
              <p>
                {booking.status === "canceled" ? (
                  <FaTimesCircle className="icon canceled" />
                ) : (
                  <FaCheckCircle className="icon active" />
                )}
                <strong> Status:</strong> {booking.status === "canceled" ? "❌ Otkazano" : "✅ Aktivno"}
              </p>
              <p><FaCalendarAlt className="icon" /> <strong>Početak:</strong> {new Date(booking.date_start).toLocaleDateString()}</p>
              <p><FaCalendarAlt className="icon" /> <strong>Kraj:</strong> {new Date(booking.date_end).toLocaleDateString()}</p>
              <p><FaMoneyBillWave className="icon" /> <strong>Ukupna cijena:</strong> ${booking.total_price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
