const pool = require("../config/db"); // Konekcija s bazom

//  Dohvati sva putovanja
const getTravels = async (req, res) => {
  try {
    const [travels] = await pool.execute("SELECT * FROM travels");
    res.json(travels);
  } catch (error) {
    console.error("❌ Greška u getTravels:", error);
    res.status(500).json({ message: "Greška pri dobavljanju putovanja" });
  }
};

//  Dohvati jedno putovanje prema ID-u
const getTravelById = async (req, res) => {
  const { id } = req.params;
  try {
    const [travel] = await pool.execute("SELECT * FROM travels WHERE id = ?", [id]);
    if (travel.length === 0) {
      return res.status(404).json({ message: "Putovanje nije pronađeno" });
    }
    res.json(travel[0]);
  } catch (error) {
    console.error("❌ Greška pri dobavljanju putovanja:", error);
    res.status(500).json({ message: "Greška pri dobavljanju putovanja" });
  }
};

//  Dodaj novo putovanje (samo admin)
const createTravel = async (req, res) => {
  const { name, description, destination, price, image } = req.body;
  try {
    const [result] = await pool.execute(
      "INSERT INTO travels (name, description, destination, price, image) VALUES (?, ?, ?, ?, ?)",
      [name, description, destination, price, image]
    );
    res.status(201).json({ message: "Putovanje uspješno dodano", travelId: result.insertId });
  } catch (error) {
    console.error("❌ Greška pri dodavanju putovanja:", error);
    res.status(500).json({ message: "Greška pri dodavanju putovanja" });
  }
};

//  Ažuriraj postojeće putovanje (samo admin)
const updateTravel = async (req, res) => {
  const { id } = req.params;
  const { name, description, destination, price, image } = req.body;

  try {
    const [result] = await pool.execute(
      "UPDATE travels SET name = ?, description = ?, destination = ?, price = ?, image = ? WHERE id = ?",
      [name, description, destination, price, image, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Putovanje nije pronađeno" });
    }

    res.json({ message: "Putovanje uspješno ažurirano" });
  } catch (error) {
    console.error("❌ Greška pri ažuriranju putovanja:", error);
    res.status(500).json({ message: "Greška pri ažuriranju putovanja" });
  }
};

//  Obriši putovanje (samo admin)
const deleteTravel = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute("DELETE FROM travels WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Putovanje nije pronađeno" });
    }
    res.json({ message: "Putovanje uspješno obrisano" });
  } catch (error) {
    console.error("❌ Greška pri brisanju putovanja:", error);
    res.status(500).json({ message: "Greška pri brisanju putovanja" });
  }
};

//  Dodaj pitanje (samo registrovani korisnici)
const addQuestion = async (req, res) => {
  const { id } = req.params;
  const { question } = req.body;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: "Niste autorizovani" });

  if (!question || question.trim() === '') {
    return res.status(400).json({ message: "Pitanje ne može biti prazno" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO travel_questions (travel_id, user_id, question) VALUES (?, ?, ?)",
      [id, userId, question]
    );

    res.status(201).json({ message: "Pitanje uspješno dodano", questionId: result.insertId });
  } catch (error) {
    console.error("❌ Greška pri dodavanju pitanja:", error);
    res.status(500).json({ message: "Greška pri dodavanju pitanja" });
  }
};

//  Dohvati sva pitanja za određeno putovanje
const getQuestionsForTravel = async (req, res) => {
  const { id } = req.params;
  try {
    const [questions] = await pool.execute(
      "SELECT q.id, q.question, u.name AS user FROM travel_questions q JOIN users u ON q.user_id = u.id WHERE q.travel_id = ?",
      [id]
    );
    res.json(questions);
  } catch (error) {
    console.error("❌ Greška pri dobavljanju pitanja:", error);
    res.status(500).json({ message: "Greška pri dobavljanju pitanja" });
  }
};

//  Obriši pitanje (samo admin)
const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  
  try {
      const [result] = await pool.execute("DELETE FROM travel_questions WHERE id = ?", [questionId]);
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Pitanje nije pronađeno." });
      }
      res.json({ message: "Pitanje uspješno obrisano." });
  } catch (error) {
      console.error("❌ Greška pri brisanju pitanja:", error);
      res.status(500).json({ message: "Greška pri brisanju pitanja." });
  }
};


//  Obriši recenziju (samo admin)
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const [result] = await pool.execute("DELETE FROM reviews WHERE id = ?", [reviewId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Recenzija nije pronađena" });
    }

    res.json({ message: "Recenzija uspješno obrisana" });
  } catch (error) {
    console.error("❌ Greška pri brisanju recenzije:", error);
    res.status(500).json({ message: "Greška pri brisanju recenzije" });
  }
};

//  Dodaj recenziju (samo registrovani korisnici)
const addReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user?.id;

  if (!userId) {
      return res.status(401).json({ message: "Morate biti prijavljeni." });
  }

  if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Ocjena mora biti između 1 i 5." });
  }

  try {
      const [result] = await pool.execute(
          "INSERT INTO reviews (travel_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
          [id, userId, rating, comment]
      );

      res.status(201).json({ message: "Recenzija dodana", reviewId: result.insertId });
  } catch (error) {
      console.error("❌ Greška pri dodavanju recenzije:", error);
      res.status(500).json({ message: "Greška pri dodavanju recenzije." });
  }
};

//  Dohvati sve recenzije za određeno putovanje
const getReviewsForTravel = async (req, res) => {
  const { id } = req.params;
  try {
      const [reviews] = await pool.execute(
          "SELECT r.id, r.rating, r.comment, r.created_at, u.name AS user FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.travel_id = ?",
          [id]
      );
      res.json(reviews);
  } catch (error) {
      console.error("❌ Greška pri dobavljanju recenzija:", error);
      res.status(500).json({ message: "Greška pri dobavljanju recenzija" });
  }
};


module.exports = {
  getTravels,
  getTravelById,
  createTravel,
  updateTravel,
  deleteTravel,
  addQuestion,
  deleteQuestion,
  getQuestionsForTravel,
  deleteReview,
  addReview,
  getReviewsForTravel
};
