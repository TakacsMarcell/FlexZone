const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    quantitygram: { type: Array },
    taste: { type: Array },
    price: { type: Number, required: true },
    type: { type: String, required:true },
    brand: { type: String, required:true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);