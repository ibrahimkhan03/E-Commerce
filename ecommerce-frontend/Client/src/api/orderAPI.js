// src/api/orderAPI.js
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/orders`;

export const getUserOrders = async (userId) => {
  const res = await axios.get(`${BASE_URL}/user/${userId}`);
  return res.data;
};
