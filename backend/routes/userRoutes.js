const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// 📌 Registracija i prijava
router.post("/register", registerUser);
router.post("/login", loginUser);

// 📌 Middleware za zaštitu ruta
router.use(protect);

// 📌 Profil korisnika
router.get("/profile", getUserProfile);

// 📌 Administratorske rute
router.get("/", admin, getUsers);
router.put("/:id", admin, updateUser);
router.delete("/:id", admin, deleteUser);

module.exports = router;
