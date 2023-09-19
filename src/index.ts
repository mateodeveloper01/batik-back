import express from "express";
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
  FRONTEND_ADMIN_URL,
  FRONTEND_CLIENT_URL,
  PORT,
} from "./config";
const app = express();
connectDB();

cloudinary.config({
  cloud_name: CLOUDINARY_API_SECRET_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
mercadopago.configure({
  access_token: ACCES_TOKEN_MERCADOPAGO as string,
});
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
console.log([FRONTEND_ADMIN_URL as string, FRONTEND_CLIENT_URL as string]);
app.use(
  cors({
    origin: [FRONTEND_ADMIN_URL as string, FRONTEND_CLIENT_URL as string], // Obligatorio que no sea "*" cuando usamos "credentials: true"
    // origin:[env.process.],
    methods: ["POST", "PUT", "DELETE", "GET", "OPTIONS"],
    credentials: true,
  })
);
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server listen Port: ${PORT}`);
});
