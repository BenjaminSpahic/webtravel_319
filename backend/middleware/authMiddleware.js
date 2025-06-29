const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token primljen u middleware-u:", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const [users] = await pool.execute(
        "SELECT id, name, email, role FROM users WHERE id = ?",
        [decoded.id]
      );

      if (!users.length) {
        return res.status(401).json({ message: "Niste autorizovani" });
      }

      req.user = users[0];
      next();
    } catch (error) {
      console.error("Greška pri autentifikaciji:", error);
      return res.status(401).json({ message: "Nevažeći token" });
    }
  } else {
    return res.status(401).json({ message: "Nema tokena, autorizacija neuspješna" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Samo administratori imaju pristup" });
  }
};

module.exports = { protect, admin };
