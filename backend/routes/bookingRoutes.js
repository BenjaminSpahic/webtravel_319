const express = require("express");
const router = express.Router();
const { 
    createBooking, 
    getUserBookings, 
    cancelBooking, 
    getAllBookings, 
    deleteBooking 
} = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");

// 📌 Kreiranje rezervacije (korisnik mora biti prijavljen)
router.post("/", protect, async (req, res, next) => {
    const { travelId, dateStart, dateEnd, totalPrice } = req.body;

    if (!travelId || !dateStart || !dateEnd || !totalPrice) {
        return res.status(400).json({ message: "Svi podaci su obavezni!" });
    }

    next();
}, createBooking);

router.post("/", protect, createBooking);


// 📌 Pregled rezervacija korisnika (samo prijavljeni korisnici)
router.get("/my-bookings", protect, getUserBookings);

// 📌 Pregled svih rezervacija (samo admin)
router.get("/", protect, admin, getAllBookings);

// 📌 Otkazivanje rezervacije (korisnik može otkazati svoju, admin bilo koju)
router.put("/:id/cancel", protect, cancelBooking);

// 📌 Brisanje rezervacije (samo admin)
router.delete("/:id", protect, admin, deleteBooking);

module.exports = router;
