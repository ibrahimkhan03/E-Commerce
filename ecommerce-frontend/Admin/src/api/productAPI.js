import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/products`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchProducts = () => axios.get(BASE_URL);

export const createProduct = (data) =>
  axios.post(BASE_URL, data, getAuthHeaders());

export const updateProduct = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data, getAuthHeaders());

export const deleteProduct = (id) =>
  axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
