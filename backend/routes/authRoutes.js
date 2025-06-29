// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Ruta za registraciju
router.post('/register', register);
// Ruta za prijavu
router.post('/login', login);

module.exports = router;
