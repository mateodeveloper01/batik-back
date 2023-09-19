import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema({
  title: { type: String },
  description: { type: String },
  img: [{ type: mongoose.Schema.Types.ObjectId, ref: "Img" }],
  products: [{ type:  mongoose.Schema.Types.ObjectId, ref: "Product" }],
  sub_categories: [{ type:  mongoose.Schema.Types.ObjectId, ref: "Sub_category" }],
});

const CategoryModel = model("Category", categorySchema);

export default CategoryModel;
