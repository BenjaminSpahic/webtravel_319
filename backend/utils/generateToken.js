const jwt = require('jsonwebtoken');

// Generiše JWT koji sadrži id i role korisnika
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
