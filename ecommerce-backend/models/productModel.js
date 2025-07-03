const { request } = require("express");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: [String],
  quantity: { type: Number, default: 0 },
  category: { type: String, required: true },
  type: { type: String, required: true },
  isBestSeller: { type: Boolean, default: false },
  isDealOfWeek: { type: Boolean, default: false }
});

module.exports = mongoose.model("Product", productSchema);