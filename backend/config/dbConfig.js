// dbConfig.js
const mysql = require('mysql2');

// Promijeni na false da bi koristili MySQL
const useMongoDB = false;

// Konfiguracija za MySQL konekciju:
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'webtravel319',
  database: 'dbtravel_319'
});

// Funkcija za povezivanje na bazu:
const connectDB = async () => {
  if (useMongoDB) {
    // MongoDB konekcija – preskočeno
  } else {
    mysqlConnection.connect((err) => {
      if (err) {
        console.error('MySQL connection error:', err.message);
        process.exit(1);
      } else {
        console.log('Connected to MySQL');
      }
    });
  }
};

module.exports = connectDB;
