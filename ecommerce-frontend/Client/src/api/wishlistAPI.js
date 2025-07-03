import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/wishlist`;

export const getWishlist = async (userId, onlyIds = false) => {
  const res = await axios.get(`${BASE_URL}/list/${userId}`);
  if (onlyIds) {
    return res.data.map((p) => p._id);
  }
  return res.data;
};

export const addToWishlist = async (userId, productId) => {
  return axios.post(`${BASE_URL}/add`, { userId, productId });
};

export const removeFromWishlist = async (userId, productId) => {
  return axios.delete(`${BASE_URL}/remove/${productId}`, {
    data: { userId },
  });
};

