import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchUserCart,
  addProductToCart,
  updateCartItem,
  removeCartItem,
  clearUserCart
} from "../api/cartAPI";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth(); 
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    if (!user?.id) return;
    try {
      const items = await fetchUserCart(user.id, token);
      setCart(items);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    console.log("🟨 Sending to backend:", {
      userId: user?.id,
      productId: product._id,
      quantity,
    });

    if (!user?.id) return;
    try {
      const items = await addProductToCart(user.id, product._id, quantity, token);
      console.log("🟩 Cart updated:", items);
      setCart(items);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user?.id) return;
    try {
      const items = await updateCartItem(user.id, productId, quantity, token);
      setCart(items);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const clearCart = async () => {
  if (!user?.id) return;
  try {
    await clearUserCart(user.id, token);
    setCart([]); // update context
  } catch (err) {
    console.error("Failed to clear cart:", err);
  }
};

  const removeFromCart = async (productId) => {
    if (!user?.id) return;
    try {
      const items = await removeCartItem(user.id, productId, token);
      setCart(items);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{ cart, fetchCart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
