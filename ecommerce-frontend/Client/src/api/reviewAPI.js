// src/api/reviewAPI.js
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/review`;

export const submitRatingReview = async ({ userId, productId, rating, review }) => {
  const res = await axios.post(`${BASE_URL}/submit`, {
    userId,
    productId,
    rating,
    review,
  });
  return res.data;
};

export const getUserReviews = async (userId) => {
  const res = await axios.get(`${BASE_URL}/${userId}`);
  return res.data;
};

export const getProductReviews = async (productId) => {
  const res = await axios.get(`${BASE_URL}/product/${productId}`);
  return res.data;
};