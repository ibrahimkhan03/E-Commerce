const Review = require("../models/review");

exports.submitReview = async (req, res) => {
  const { userId, productId, rating, review } = req.body;

  try {
    const existing = await Review.findOne({ user: userId, product: productId });

    if (existing) {
      existing.rating = rating;
      existing.review = review;
      await existing.save();
    } else {
      await Review.create({ user: userId, product: productId, rating, review });
    }

    res.status(200).json({ message: "Review submitted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit review", error });
  }
};

exports.getUserReviews = async (req, res) => {
  const { userId } = req.params;

  try {
    const reviews = await Review.find({ user: userId }).populate("product");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
exports.getProductReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId }).populate("user", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product reviews", error });
  }
};

