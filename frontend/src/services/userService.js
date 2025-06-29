// src/services/userService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

//  Dohvati sve korisnike
const getUsers = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Ažuriranje statusa korisnika (npr. aktivan/neaktivan)
const updateUserStatus = async (userId, status, token) => {
  try {
    const response = await axios.put(
      `${API_URL}${userId}/status`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

//  Dohvati podatke o trenutnom korisniku
const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default {
  getUsers,
  updateUserStatus,
  getUserProfile,
};
