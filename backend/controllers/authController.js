const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log("📥 Primljen zahtjev za registraciju:", { name, email, role });

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Sva polja su obavezna" });
  }

  try {
    const [existingUser] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Korisnik sa ovim emailom već postoji" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "user"]
    );
    console.log("✅ Novi korisnik uspješno dodat, ID:", result.insertId);
    res.status(201).json({ message: "Registracija uspješna", userId: result.insertId });
  } catch (error) {
    console.error("❌ Greška pri registraciji:", error);
    res.status(500).json({ message: "Greška na serveru. Provjeri backend logove." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Primljen zahtjev za prijavu:", { email });
  if (!email || !password) {
    return res.status(400).json({ message: "Sva polja su obavezna" });
  }
  try {
    const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Pogrešna lozinka" });
    }
    const token = generateToken(user.id, user.role);
    console.log("✅ Prijava uspješna, token generisan za korisnika:", user.id);
    res.status(200).json({ token, userId: user.id, role: user.role, name: user.name });
  } catch (error) {
    console.error("❌ Greška pri prijavi:", error);
    res.status(500).json({ message: "Greška na serveru. Provjeri backend logove." });
  }
};

module.exports = { register, login };
