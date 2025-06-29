// app.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const travelRoutes = require('./routes/travelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./utils/errorHandler');

// Učitaj .env fajl sa podešavanjima
dotenv.config();

// Kreiraj Express aplikaciju
const app = express();

// Poveži se na bazu podataka
connectDB();

// Omogućiti parsiranje JSON podataka u tijelu zahteva
app.use(express.json());

// Ruta za korisnike
app.use('/api/users', userRoutes);

// Ruta za putovanja
app.use('/api/travels', travelRoutes);

// Ruta za rezervacije (ako koristiš rezervacije)
app.use('/api/bookings', bookingRoutes);

// Globalni error handler
app.use(errorHandler);

// Pokreni server na portu koji je definisan u .env fajlu
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
