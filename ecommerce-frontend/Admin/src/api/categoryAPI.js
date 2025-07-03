import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/categories`;

export const fetchCategories = () => axios.get(BASE_URL);
export const createCategory = (data) => axios.post(BASE_URL, data);
