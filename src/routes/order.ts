import { Router } from "express";
import { all } from "../controllers/order";

const routes = Router();

routes.get("/", all);


export default routes;
