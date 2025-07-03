const express = require("express");
const router = express.Router();
const {
  submitReview,
  getUserReviews,
  getProductReviews,
} = require("../controllers/reviewController");

router.post("/submit", submitReview);
router.get("/product/:productId", getProductReviews);
router.get("/:userId", getUserReviews);

module.exports = router;

