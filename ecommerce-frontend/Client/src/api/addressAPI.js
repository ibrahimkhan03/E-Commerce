import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/address`;
console.log("BASE_URL:", BASE_URL);

export const fetchAddresses = async (userId, token) => {
  const res = await axios.get(`${BASE_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const saveAddress = async (addressData, token) => {
  const res = await axios.post(`${BASE_URL}/save`, addressData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteAddress = async (userId, addressId, token) => {
  const res = await axios.delete(`${BASE_URL}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { userId, addressId },
  });
  return res.data;
};
