const pool = require("../config/db"); // Konekcija s bazom

//  Kreiranje nove rezervacije
const createBooking = async (req, res) => {
    const { travelId, dateStart, dateEnd, totalPrice } = req.body;
    const userId = req.user?.id; // Provjera korisnika

    if (!userId) {
        return res.status(401).json({ message: "Morate biti prijavljeni da biste rezervisali." });
    }

    try {
        // Provjerimo da li putovanje postoji
        const [travel] = await pool.execute("SELECT id FROM travels WHERE id = ?", [travelId]);
        if (travel.length === 0) {
            return res.status(404).json({ message: "Putovanje nije pronađeno." });
        }

        // Kreiramo rezervaciju
        const [result] = await pool.execute(
            "INSERT INTO bookings (user_id, travel_id, date_start, date_end, total_price) VALUES (?, ?, ?, ?, ?)",
            [userId, travelId, dateStart, dateEnd, totalPrice]
        );

        res.status(201).json({ message: "Rezervacija uspješno kreirana", bookingId: result.insertId });
    } catch (error) {
        console.error("❌ Greška pri kreiranju rezervacije:", error);
        res.status(500).json({ message: "Greška pri kreiranju rezervacije." });
    }
};

//  Dohvatanje rezervacija za trenutno prijavljenog korisnika
const getUserBookings = async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Niste autorizovani." });
    }

    try {
        const [bookings] = await pool.execute(
            "SELECT b.id, b.date_start, b.date_end, b.total_price, t.name AS travel_name FROM bookings b JOIN travels t ON b.travel_id = t.id WHERE b.user_id = ?",
            [userId]
        );

        res.json(bookings);
    } catch (error) {
        console.error("❌ Greška pri dobavljanju rezervacija:", error);
        res.status(500).json({ message: "Greška pri dobavljanju rezervacija." });
    }
};

//  Otkazivanje rezervacije (samo vlasnik rezervacije ili admin)
const cancelBooking = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const isAdmin = req.user?.role === "admin";

    try {
        const [booking] = await pool.execute("SELECT user_id FROM bookings WHERE id = ?", [id]);

        if (booking.length === 0) {
            return res.status(404).json({ message: "Rezervacija nije pronađena." });
        }

        if (booking[0].user_id !== userId && !isAdmin) {
            return res.status(403).json({ message: "Nemate dozvolu da otkažete ovu rezervaciju." });
        }

        await pool.execute("DELETE FROM bookings WHERE id = ?", [id]);
        res.json({ message: "Rezervacija uspješno otkazana." });
    } catch (error) {
        console.error("❌ Greška pri otkazivanju rezervacije:", error);
        res.status(500).json({ message: "Greška pri otkazivanju rezervacije." });
    }
};

//  Pregled svih rezervacija (samo admin)
const getAllBookings = async (req, res) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Nemate dozvolu za ovu akciju." });
    }

    try {
        const [bookings] = await pool.execute(
            "SELECT b.id, u.name AS user, t.name AS travel, b.date_start, b.date_end, b.total_price FROM bookings b JOIN users u ON b.user_id = u.id JOIN travels t ON b.travel_id = t.id"
        );

        res.json(bookings);
    } catch (error) {
        console.error("❌ Greška pri dohvatanju svih rezervacija:", error);
        res.status(500).json({ message: "Greška pri dohvatanju rezervacija." });
    }
};

// Brisanje rezervacije (samo admin)
const deleteBooking = async (req, res) => {
    const { id } = req.params;

    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Nemate dozvolu za ovu akciju." });
    }

    try {
        const [result] = await pool.execute("DELETE FROM bookings WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Rezervacija nije pronađena." });
        }

        res.json({ message: "Rezervacija uspješno obrisana." });
    } catch (error) {
        console.error("❌ Greška pri brisanju rezervacije:", error);
        res.status(500).json({ message: "Greška pri brisanju rezervacije." });
    }
};

// Dugme za rezervaciju - dodata provjera ako rezervacija već postoji
const checkExistingBooking = async (req, res) => {
    const { travelId } = req.params;
    const userId = req.user?.id;

    try {
        const [existingBooking] = await pool.execute(
            "SELECT id FROM bookings WHERE user_id = ? AND travel_id = ?",
            [userId, travelId]
        );

        if (existingBooking.length > 0) {
            return res.status(400).json({ message: "Već imate aktivnu rezervaciju za ovo putovanje." });
        }

        res.json({ message: "Možete rezervisati ovo putovanje." });
    } catch (error) {
        console.error("❌ Greška pri provjeri rezervacije:", error);
        res.status(500).json({ message: "Greška pri provjeri rezervacije." });
    }
};

module.exports = {
    createBooking,
    getUserBookings,
    cancelBooking,
    getAllBookings,
    deleteBooking,
    checkExistingBooking, //  Dodano za provjeru postojećih rezervacija
};
