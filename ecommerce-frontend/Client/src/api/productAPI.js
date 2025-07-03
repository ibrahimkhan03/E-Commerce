import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// ✅ Fetch all products
export const fetchProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data.products;
};

// ✅ Fetch products by category (optional use)
export const fetchProductsByCategory = async (category) => {
  const res = await axios.get(`${BASE_URL}/products?category=${category}`);
  return res.data.products;
};

// ✅ Fetch Deal of the Week product by category
export const fetchDealProduct = async (category) => {
  const res = await axios.get(`${BASE_URL}/products/deal-of-week?category=${category}`);
  return res.data;
};

// ✅ Fetch paginated products (used for "Load More" or pages)
export const fetchPaginatedProducts = async (page = 1, limit = 9) => {
  const res = await axios.get(`${BASE_URL}/products?page=${page}&limit=${limit}`);
  return res.data;
};
