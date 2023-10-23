import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  new: { type: Boolean },
  isStock: { type: Boolean },
  img: [{ type: mongoose.Schema.Types.ObjectId, ref: "Img" }],
  type: {
    type: String,
    enum: ["normal", "featured", "trending"],
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const ProductModel = model("Product", productSchema);

export default ProductModel;
