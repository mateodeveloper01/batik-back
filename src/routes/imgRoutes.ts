import { Router } from "express";
import { all, upload, remove } from "../controllers/img";
import multer from "multer";

const routes = Router();
const uploadMulter = multer({ dest: "uploads/" });

routes.get("/", all);
routes.post("/", uploadMulter.array("img"), upload);
routes.delete("/:id", remove);

export default routes;
