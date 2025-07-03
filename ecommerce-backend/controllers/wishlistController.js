const Wishlist = require("../models/Wishlist");

exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { userId } = req.body;
  const { productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
      res.status(200).json({ message: "Product removed", wishlist });
    } else {
      res.status(404).json({ message: "Wishlist not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};

exports.getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products");

    if (!wishlist) {
      return res.status(200).json([]);
    }

    // Return populated product objects
    res.status(200).json(wishlist.products);
    
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist", error });
  }
};
