import { Router } from "express";

import { register, login } from "../controllers/auth";

const routes = Router();

routes.post("/register", register);
routes.post("/login", login);

export default routes;
