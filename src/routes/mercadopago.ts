import { Router } from "express";

import {
  createOrder,
  failure,
  pending,
  success,
  webhook,
} from "../controllers/mergadopago";
const routes = Router();

routes.post("/create-order", createOrder);

routes.get("/success", success);

routes.get("/failure", failure);

routes.get("/pending", pending);

routes.post("/webhook", webhook);

export default routes;
