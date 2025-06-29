// src/components/TravelDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaInfoCircle, FaDollarSign, FaRegCalendarAlt, FaQuestionCircle, FaStar, FaTrash } from "react-icons/fa";

const TravelDetails = () => {
  const { id } = useParams();
  const [travel, setTravel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [question, setQuestion] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const travelRes = await axios.get(`http://localhost:5000/api/travels/${id}`);
        setTravel(travelRes.data);

        const questionsRes = await axios.get(`http://localhost:5000/api/travels/${id}/questions`);
        setQuestions(questionsRes.data);

        const reviewsRes = await axios.get(`http://localhost:5000/api/travels/${id}/reviews`);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error("Greška pri dohvatanju podataka:", error);
      }
    };
    fetchData();
  }, [id]);

  //  Funkcija za dodavanje pitanja
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!user) return alert("Morate biti prijavljeni da biste postavili pitanje.");
    if (!question.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/travels/${id}/questions`,
        { question },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setQuestions([...questions, { id: response.data.questionId, question, user: user.name }]);
      setQuestion('');
    } catch (error) {
      console.error("Greška pri slanju pitanja:", error);
    }
  };

  //  Funkcija za brisanje pitanja (samo admin)
  const handleDeleteQuestion = async (questionId) => {
    if (!user || user.role !== "admin") return;
    if (!window.confirm("Da li ste sigurni da želite obrisati komentar?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/travels/${id}/questions/${questionId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setQuestions(questions.filter((q) => q.id !== questionId));
    } catch (error) {
      console.error("Greška pri brisanju komentara:", error);
    }
  };

  //  Funkcija za dodavanje recenzije
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return alert("Morate biti prijavljeni da biste ostavili recenziju.");
    if (rating < 1 || rating > 5) return alert("Ocjena mora biti između 1 i 5.");

    try {
      const response = await axios.post(
        `http://localhost:5000/api/travels/${id}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setReviews([...reviews, { id: response.data.reviewId, rating, comment, user: user.name }]);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error("Greška pri slanju recenzije:", error);
    }
  };

  //  Funkcija za rezervaciju putovanja (otvara modal)
  const handleBooking = async () => {
    if (!user) {
      alert("Morate biti prijavljeni da biste rezervisali putovanje.");
      return;
    }
    setShowModal(true);
  };

  //  Potvrda rezervacije
  const confirmBooking = async () => {
    if (!travel) {
      alert("Podaci o putovanju nisu dostupni.");
      return;
    }

    const bookingData = {
      travelId: id,
      dateStart: "2025-06-01",
      dateEnd: "2025-06-10",
      totalPrice: travel.price,
    };

    try {
      await axios.post("http://localhost:5000/api/bookings", bookingData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setShowModal(false);
      alert("Rezervacija uspješna!");
    } catch (error) {
      console.error("❌ Greška pri rezervaciji:", error);
      alert(error.response?.data?.message || "Greška pri rezervaciji.");
    }
  };

  //  Funkcija za brisanje recenzije (samo admin)
  const handleDeleteReview = async (reviewId) => {
    if (!user || user.role !== "admin") return;
    if (!window.confirm("Da li ste sigurni da želite obrisati recenziju?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/travels/${id}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setReviews(reviews.filter((r) => r.id !== reviewId));
    } catch (error) {
      console.error("Greška pri brisanju recenzije:", error);
    }
  };

  if (!travel) return <p style={{ textAlign: "center" }}>Učitavam detalje putovanja...</p>;

  return (
    <div className="travel-details">
      <h1>{travel.name}</h1>
      <img src={travel.image || 'default.jpg'} alt={travel.name} className="travel-image" />
      <div className="travel-info">
        <p><FaMapMarkerAlt className="icon" /> <strong>Destinacija:</strong> {travel.destination}</p>
        <p><FaInfoCircle className="icon" /> <strong>Opis:</strong> {travel.description}</p>
        <p><FaDollarSign className="icon" /> <strong>Cijena:</strong> ${travel.price}</p>
        <p><FaRegCalendarAlt className="icon" /> <strong>Datum:</strong> 1. juni - 10. juni 2025.</p>
      </div>

      {user && (
        <>
          <button onClick={handleBooking} className="book-button">
            Rezerviši putovanje
          </button>

          {/*  Forma za postavljanje pitanja */}
          <h3>Postavite pitanje:</h3>
          <form onSubmit={handleSubmitQuestion} className="question-form">
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} required className="question-textarea" />
            <button type="submit" className="submit-button">Pošalji pitanje</button>
          </form>

          {/*  Forma za dodavanje recenzije */}
          <h3>Dodajte recenziju:</h3>
          <form onSubmit={handleSubmitReview} className="review-form">
            <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Dodajte komentar..." required />
            <button type="submit">Dodaj recenziju</button>
          </form>
        </>
      )}

      <h3>Pitanja korisnika:</h3>
      <ul className="question-list">
        {questions.map((q) => (
          <li key={q.id} className="question-item">
            <strong>{q.user}:</strong> {q.question}
            {user?.role === "admin" && (
              <button onClick={() => handleDeleteQuestion(q.id)} className="delete-button">
                <FaTrash />
              </button>
            )}
          </li>
        ))}
      </ul>

      <h3>Recenzije:</h3>
      <ul className="review-list">
        {reviews.map((r) => (
          <li key={r.id} className="review-item">
            <p><strong>{r.user}:</strong> {r.comment}</p>
            {user?.role === "admin" && (
              <button onClick={() => handleDeleteReview(r.id)} className="delete-button">
                <FaTrash />
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Modal za potvrdu rezervacije */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Potvrdi rezervaciju</h3>
            <p>Da li ste sigurni da želite rezervisati putovanje?</p>
            <button onClick={confirmBooking}>Potvrdi</button>
            <button onClick={() => setShowModal(false)}>Otkaži</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelDetails;
