import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/cart`;
console.log("Cart API Base URL:", BASE_URL);

export const fetchUserCart = async (userId, token) => {
  const res = await axios.get(`${BASE_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.items;
};

export const addProductToCart = async (userId, productId, quantity, token) => {
  const res = await axios.post(
    `${BASE_URL}/add`,
    { userId, productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.items;
};

export const updateCartItem = async (userId, productId, quantity, token) => {
  const res = await axios.put(
    `${BASE_URL}/update`,
    { userId, productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.items;
};

export const removeCartItem = async (userId, productId, token) => {
  const res = await axios.delete(`${BASE_URL}/remove`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { userId, productId },
  });
  return res.data.items;
};

export const clearUserCart = async (userId, token) => {
  const res = await axios.post(
    `${BASE_URL}/clear`,
    { userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.items;
};
