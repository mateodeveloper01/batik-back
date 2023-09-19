import { Request, Response } from "express";
import CategoryModel from "../models/category";

export const all = async (req: Request, res: Response) => {
  try {
    // await new CategoryModel(req.body).save();
    const data = await CategoryModel.find({}).populate("img");

    res.json({ data }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};

export const id = async (req: Request, res: Response) => {
  try {
    // await new CategoryModel(req.body).save();
    const data = await CategoryModel.find({title:req.params.id}).populate("img");

    res.json({ data }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};


export const add = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    await new CategoryModel(req.body).save();
    res.json({ message: "Categoria agregada", user: req.body }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al agregar categoria", error });
  }
};

export const edit = async (req: Request, res: Response) => {
  try {
    let product = await CategoryModel.findByIdAndUpdate(req.body._id, req.body);

    await product?.save();

    res.json({ message: "Producto editado", user: req.body }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al editar producto", error });
  }
};


export const remove = async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    await CategoryModel.deleteOne({ _id: req.params.id });
    res.json({ message: "Producto eliminado" }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};