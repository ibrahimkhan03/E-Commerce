const Product = require("../models/productModel");


// Create
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Create Error:", err.message);
    res.status(400).json({ message: err.message });
  }
};


// Read Single
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not Found" });
  res.json(product);
};

// Update
exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

// GET ALL PRODUCTS

exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};  
    const products = await Product.find(query);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error });
  }
};

exports.getDealOfWeekProduct = async (req, res) => {
  try {
    const { category } = req.query;
    const query = {
      isDealOfWeek: true,
      ...(category ? { category } : {})
    };
    console.log("Deal query:", query);
    const product = await Product.findOne(query);
    if (!product) {
      return res.status(404).json({ message: "No Deal of the Week product found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Failed to fetch deal product:", error); // <-- YEH LINE ZARUR HO
    res.status(500).json({ message: "Server Error", error: error.message });
    console.log("Deal query:", query);
  }
};

// Get All Products with Pagination
exports.getPaginatedProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      products,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    console.error("Pagination Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

