import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaMoneyBillWave, FaTimesCircle, FaCheckCircle, FaUndo } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        alert("Morate biti prijavljeni da biste vidjeli svoje rezervacije.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/bookings/my-bookings", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setBookings(response.data);
      } catch (error) {
        console.error("❌ Greška pri dohvatanju rezervacija:", error);
        alert("Došlo je do greške pri dohvatanju rezervacija.");
      }
    };

    fetchBookings();
  }, [user]);

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const confirmCancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      await axios.put(`http://localhost:5000/api/bookings/${selectedBooking.id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBooking.id ? { ...booking, status: "canceled" } : booking
        )
      );

      setShowModal(false);
      alert("Rezervacija je uspješno otkazana.");
    } catch (error) {
      console.error("❌ Greška pri otkazivanju rezervacije:", error);
      alert("Došlo je do greške pri otkazivanju rezervacije.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Moje rezervacije</h2>

      {bookings.length === 0 ? (
        <p>Nemate nijednu rezervaciju.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking, index) => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.travel_name}</h3>
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
              <p><FaMoneyBillWave className="icon" /> <strong>Cijena:</strong> ${booking.total_price}</p>

              {booking.status !== "canceled" && (
                <button className="cancel-button" onClick={() => openCancelModal(booking)}>
                  <FaUndo className="icon" /> Otkazati rezervaciju
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Dugme za povratak na početnu stranicu */}
      <Link to="/">
        <button className="back-button">🏠 Povratak na početnu stranicu</button>
      </Link>

      {/*  Modalni prozor za potvrdu otkazivanja */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Potvrdi otkazivanje</h2>
            <p>Da li ste sigurni da želite otkazati ovu rezervaciju?</p>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={confirmCancelBooking}>Potvrdi</button>
              <button className="cancel-button" onClick={() => setShowModal(false)}>Odustani</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
