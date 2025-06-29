// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

// 🆕 Funkcija za registraciju novog korisnika
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// 🆕 Funkcija za prijavu korisnika
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);
    
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data)); // ✅ Čuva token u localStorage
    }

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// 🆕 Funkcija za odjavu korisnika
const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
