import mongoose from "mongoose";
import { MONGODB_URL } from "../config";

async function connectDB() {
  if (!MONGODB_URL) {
    throw new Error("Falta la variable de entorno MONGODB_URL");
  }
  try {
    console.log("Database connect");
    await mongoose.connect(MONGODB_URL);//!
  } catch (error) {
    console.log({ mesage: "Error al conectar a mongo", error });
  }
}

export default connectDB;
