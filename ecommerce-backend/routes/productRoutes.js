const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getDealOfWeekProduct,
  getPaginatedProducts
} = require("../controllers/productController");

const { authenticateUser } = require("../middleware/authMiddleware");

// Important: Specific routes BEFORE dynamic :id route
router.get("/products/paginated", getPaginatedProducts);
router.get("/deal-of-week", getDealOfWeekProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById); // <-- Keep this at the bottom

router.post("/", authenticateUser, createProduct);
router.put("/:id", authenticateUser, updateProduct);
router.delete("/:id", authenticateUser, deleteProduct);

module.exports = router;

