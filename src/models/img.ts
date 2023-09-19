import { Schema, model } from "mongoose";

const imgSchema = new Schema({
  url: { type: String },
  title: { type: String },
  cloudinaryId: { type: String },
});

const ImgModel = model("Img", imgSchema);

export default ImgModel;
