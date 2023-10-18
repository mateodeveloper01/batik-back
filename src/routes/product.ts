import { Router } from "express";
import {
  all,
  add,
  edit,
  remove,
  filterType,
  getById,
} from "../controllers/products";
import { validateUser } from "../middlewares/auth";

const routes = Router();

routes.get("/", all);
routes.get("/type/:type", filterType);
routes.get("/id/:id", getById);
routes.post("/", add);
routes.put("/", edit);

routes.delete("/:id", remove);

export default routes;
