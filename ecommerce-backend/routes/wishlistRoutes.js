const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

router.post("/add", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);
router.get("/list/:userId", getWishlist);

module.exports = router;
