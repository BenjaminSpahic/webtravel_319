// src/services/travelService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/travels';

// 🆕 Funkcija za dohvaćanje svih putovanja
const getTravels = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

//  Funkcija za dodavanje novog putovanja (potrebno proslijediti token za autorizaciju)
const addTravel = async (travelData, token) => {
  try {
    const response = await axios.post(API_URL, travelData, {
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

//  Funkcija za ažuriranje postojećeg putovanja
const updateTravel = async (id, travelData, token) => {
  try {
    const response = await axios.put(`${API_URL}${id}`, travelData, {
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

//  Funkcija za brisanje putovanja
const deleteTravel = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default {
  getTravels,
  addTravel,
  updateTravel,
  deleteTravel,
};
