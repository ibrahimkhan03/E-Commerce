const Cart = require("../models/cartModel");

// Cart by userId
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.product");
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", err });
  }
};

// Add to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart for the user
      cart = new Cart({
        userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // If cart item exists
      const index = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (index > -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate("items.product");
    res.json(updatedCart);
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ message: "Error adding to cart", err });
  }
};


// Update Quantity
exports.updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.product.toString() === productId);
    if (item) item.quantity = quantity;

    await cart.save();
    const updatedCart = await Cart.findOne({ userId }).populate("items.product");
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Error updating cart item", err });
  }
};

// Remove from Cart
exports.removeCartItem = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate("items.product");
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Error removing item", err });
  }
};

// Clear Cart (after order)
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared", items: [] });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart", err });
  }
};


