import { Router } from "express";
import { all,add, edit, remove, id } from "../controllers/category";

const routes = Router();

routes.get("/",all);
routes.get("/:id",id);

routes.post("/",add);
routes.put("/",edit);
routes.delete("/:id",remove);

export default routes;
