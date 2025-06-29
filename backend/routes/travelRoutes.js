const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const { 
    getTravels,
    getTravelById,
    createTravel,
    updateTravel,
    addQuestion,
    getQuestionsForTravel,
    deleteReview,
    getReviewsForTravel,
    deleteQuestion,
    addReview
} = require("../controllers/travelController");

// 📌 Ruta za dohvatanje svih putovanja
router.get("/", getTravels);

// 📌 Ruta za dohvatanje jednog putovanja po ID-u
router.get("/:id", getTravelById);

// 📌 Ruta za kreiranje novog putovanja (samo admin)
router.post("/", protect, admin, createTravel);

// 📌 Ruta za ažuriranje putovanja (samo admin)
router.put("/:id", protect, admin, updateTravel);

router.delete("/:id/questions/:questionId", protect, admin, deleteQuestion);

// 📌 Ruta za dodavanje pitanja na putovanje (samo registrovani korisnici)
router.post("/:id/questions", protect, addQuestion);

// 📌 Ruta za dohvatanje pitanja za određeno putovanje
router.get("/:id/questions", getQuestionsForTravel);

router.post("/:id/reviews", protect, addReview);

// 📌 Ruta za dohvatanje recenzija određenog putovanja
router.get("/:id/reviews", getReviewsForTravel);

// 📌 Ruta za brisanje recenzije (samo admin)
router.delete("/:id/reviews/:reviewId", protect, admin, deleteReview);

module.exports = router;
