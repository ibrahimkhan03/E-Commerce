import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const BASE_URL = API;



const handleApiError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  } else {
    throw new Error("Something went wrong. Please try again.");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Login failed. Please try again.");}
}

export const 
registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Registration failed. Please try again.");
  }
};