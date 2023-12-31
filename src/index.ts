import express from "express";
import os from "os";
import routes from "./routes";
import connectDB from "./db/connect";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import morgan from "morgan";
import mercadopago from "mercadopago";
import {
  ACCES_TOKEN_MERCADOPAGO,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_SECRET_NAME,
  FRONTEND_ADMIN_DEV_URL,
  FRONTEND_ADMIN_URL,
  FRONTEND_CLIENT_URL,
  PORT,
} from "./config";
import ProductModel from "./models/products";
const app = express();
connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

cloudinary.config({
  cloud_name: CLOUDINARY_API_SECRET_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
mercadopago.configure({
  access_token: ACCES_TOKEN_MERCADOPAGO as string,
});

console.log([
  FRONTEND_ADMIN_URL as string,
  FRONTEND_CLIENT_URL as string,
  FRONTEND_ADMIN_DEV_URL as string,
]);
app.use(
  cors({
    origin: [
      FRONTEND_ADMIN_URL as string,
      FRONTEND_CLIENT_URL as string,
      FRONTEND_ADMIN_DEV_URL as string,
    ],
    methods: ["POST", "PUT", "DELETE", "GET", "OPTIONS"],
    credentials: true,
  })
);
// app.use("/update", async (_, res) => {
//   try {
//     await ProductModel.updateMany({}, { $set: { isStock: true } });
//     res.status(200).send("");
//   } catch (error) {
//     console.log(error);

//     res.status(404).send({ error });
//   }
// });
app.use("/health-check", (_, res) => {
  res.status(200).send(os.hostname());
});
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server listen Port: ${PORT}`);
});
