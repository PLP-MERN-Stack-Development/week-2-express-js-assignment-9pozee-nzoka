const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  inStock: { type: Number, default: 0 },
  imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
