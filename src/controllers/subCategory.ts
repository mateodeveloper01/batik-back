import { Request, Response } from "express";
import SubCategoryModel from "../models/subCategory";
import CategoryModel from "../models/category";

export const all = async (req: Request, res: Response) => {
  try {
    if (req.query?.filter) {
      const filter = req.query.filter as { title: string };

      const category = await CategoryModel.find({ title: filter.title });

      const data = await SubCategoryModel.find({
        categories: category[0].id,
      }).populate("categories");
      res.status(200).json({ message: "Categorías encontradas", data });
    } else {
      const data = await SubCategoryModel.find({}).populate("categories");
      res.status(200).json({ message: "Categorías encontradas", data });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    await new SubCategoryModel(req.body).save();
    res.json({ message: "sub categoria agregada", user: req.body }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};
export const edit = async (req: Request, res: Response) => {
  try {
    let product = await SubCategoryModel.findByIdAndUpdate(
      req.body._id,
      req.body
    );

    await product?.save();

    res.json({ message: "Categoria editada", user: req.body }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al editar producto", error });
  }
};
export const id = async (req: Request, res: Response) => {
  try {
    // await new CategoryModel(req.body).save();
    const data = await SubCategoryModel.find({ title: req.params.id }).populate(
      "img"
    );

    res.json({ data }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};
export const remove = async (req: Request, res: Response) => {
  try {
    await SubCategoryModel.deleteOne({ _id: req.params.id });
    res.json({ message: "Eliminado" }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};
