import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import ImgModel from "../models/img";

export const all = async (req: Request, res: Response) => {
  try {
    const data = await ImgModel.find({});

    res.json({ message: "Categoria agregada", data }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};

export const upload = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se encontró ningún archivo" });
  }

  cloudinary.uploader.upload(req.file.path, async (err: any, result: any) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error al subir la imagen a Cloudinary" });
    }
    try {
      await new ImgModel({
        url: result.secure_url,
        title: req.body.name,
        cloudinaryId: result.public_id,
      }).save();
      res.json({ imageUrl: result.secure_url });
    } catch (error) {}
  });
};
export const remove = async (req: Request, res: Response) => {
  const public_id = req.params.id;

  try {
    // Intenta eliminar la imagen de Cloudinary
    const resultCloudinary = await cloudinary.uploader.destroy(public_id);
    const resultDb = await ImgModel.deleteOne({ cloudinaryId: public_id });

    // Verifica si se pudo eliminar la imagen
    if (resultCloudinary.result === "ok" && resultDb.deletedCount === 1) {
      return res.json({
        message: "Imagen eliminada exitosamente de Cloudinary.",
      });
    } else {
      return res.status(500).json({ error: "No se pudo eliminar la imagen." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ocurrió un error al intentar eliminar la imagen." });
  }
};
