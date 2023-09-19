import mongoose, { Schema, model } from "mongoose";

const subCategorySchema = new Schema({
  title: { type: String },
  categories: [{ type:  mongoose.Schema.Types.ObjectId, ref: "Category" }],
  products: [{ type:  mongoose.Schema.Types.ObjectId, ref: "Product" }],
  
});

const SubCategoryModel = model("Sub_category", subCategorySchema);

export default SubCategoryModel;
