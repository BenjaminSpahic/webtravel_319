const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // 🛠️ Uvezi CORS
const pool = require('./config/db'); // ✅ Ispravan import
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const travelRoutes = require('./routes/travelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./utils/errorHandler');
const morgan = require('morgan');

dotenv.config();

const app = express();

// Logovanje zahtjeva
app.use(morgan('dev'));

app.use(cors()); // ✅ CORS middleware

console.log('Pokrećem konekciju na bazu...');

// Testiraj konekciju s bazom
pool.getConnection()
  .then((conn) => {
    console.log('✅ MySQL konekcija uspješna!');
    conn.release();
  })
  .catch((err) => {
    console.error('❌ Greška pri povezivanju s MySQL:', err.message);
    process.exit(1);
  });

// Middleware za parsiranje JSON-a
app.use(express.json());

// Definisanje API ruta
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/travels', travelRoutes);
app.use('/api/bookings', bookingRoutes);

// Globalni error handler
app.use(errorHandler);

// Pokreni server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server pokrenut na portu ${PORT}`);
});
