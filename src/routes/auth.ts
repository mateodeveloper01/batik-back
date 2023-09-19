import { Router } from "express";
import { register,login } from "../controllers/auth";
import { register as registerLocal,login as loginLocal } from "../controllers/authLocal";

const routes = Router();

routes.post("/register",register);
routes.post("/login",login);

routes.post("/local/register",registerLocal);
routes.post("/local/login",loginLocal);


export default routes;
