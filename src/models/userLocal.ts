import { Schema, model } from "mongoose";

const userLocalSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
});

const userLocalModel = model("UserLocal", userLocalSchema);

export default userLocalModel;
