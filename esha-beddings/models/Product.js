const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }, // Add category field
});

// Check if the model already exists to avoid overwriting it
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
