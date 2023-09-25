import { Router } from "express";
import { all, findByEmail } from "../controllers/order";

const routes = Router();

routes.get("/", all);

routes.get('/:email',findByEmail)

export default routes;
