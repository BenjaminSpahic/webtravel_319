const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

//  Generisanje JWT tokena
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//  Registracija korisnika
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Sva polja su obavezna." });
  }

  try {
    const [existingUsers] = await pool.execute("SELECT id FROM users WHERE email = ?", [email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email adresa je već registrirana." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')",
      [name, email, hashedPassword]
    );

    const token = generateToken(result.insertId, "user");

    res.status(201).json({ token, userId: result.insertId, role: "user", name });
  } catch (error) {
    console.error("Greška pri registraciji:", error);
    res.status(500).json({ message: "Greška pri registraciji korisnika." });
  }
};

//  Prijava korisnika
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.execute("SELECT id, name, email, password, role FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(400).json({ message: "Neispravni podaci." });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Neispravni podaci." });
    }

    const token = generateToken(user.id, user.role);

    res.status(200).json({ token, userId: user.id, role: user.role, name: user.name });
  } catch (error) {
    console.error("Greška pri prijavi:", error);
    res.status(500).json({ message: "Greška pri prijavi korisnika." });
  }
};

//  Dohvati trenutno prijavljenog korisnika
const getUserProfile = async (req, res) => {
  try {
    const [users] = await pool.execute("SELECT id, name, email, role FROM users WHERE id = ?", [req.user.id]);

    if (users.length === 0) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }

    res.json({
      id: users[0].id,
      name: users[0].name,
      email: users[0].email,
      role: users[0].role,
    });
  } catch (error) {
    console.error("Greška pri dohvatanju korisničkog profila:", error);
    res.status(500).json({ message: "Greška pri dohvatanju korisničkog profila." });
  }
};

//  Dohvatanje svih korisnika (samo za admina)
const getUsers = async (req, res) => {
  try {
    const [users] = await pool.execute("SELECT id, name, email, role FROM users");
    res.status(200).json(users);
  } catch (error) {
    console.error("Greška pri dohvatanju korisnika:", error);
    res.status(500).json({ message: "Greška pri dohvatanju korisnika" });
  }
};

//  Ažuriranje korisnika (samo admin)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;

  try {
    const [result] = await pool.execute("UPDATE users SET name = ?, role = ? WHERE id = ?", [name, role, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }

    res.status(200).json({ message: "Korisnik uspješno ažuriran." });
  } catch (error) {
    console.error("Greška pri ažuriranju korisnika:", error);
    res.status(500).json({ message: "Greška pri ažuriranju korisnika." });
  }
};

//  Brisanje korisnika (samo admin)
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }

    res.status(200).json({ message: "Korisnik uspješno obrisan." });
  } catch (error) {
    console.error("Greška pri brisanju korisnika:", error);
    res.status(500).json({ message: "Greška pri brisanju korisnika." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  updateUser,
  deleteUser,
};
