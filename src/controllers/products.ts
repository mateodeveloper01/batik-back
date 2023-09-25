import { Request, Response } from "express";
import ProductModel from "../models/products";
import CategoryModel from "../models/category";

interface Props {
  category: string;
}

export const all = async (req: Request, res: Response) => {
  const filter = req.query.filter as unknown;
  try {
    if (typeof filter === "object" && filter !== null) {
      const filterProps = filter as Props;
      const category = await CategoryModel.find({
        title: filterProps.category,
      });
      const data = await ProductModel.find({
        categories: category[0].id,
      })
        .populate("img")
        .populate("categories");
      res.status(200).json({ data });
    } else {
      const data = await ProductModel.find({})
        .populate("categories")
        .populate("img");
      res.status(200).json({ data });
    }
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    await new ProductModel(req.body).save();
    res.json({ message: "Producto agregado", user: req.body }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};
export const remove = async (req: Request, res: Response) => {
  try {
    await ProductModel.deleteOne({ _id: req.params.id });
    res.json({ message: "Eliminado" }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};
export const edit = async (req: Request, res: Response) => {
  try {
    let product = await ProductModel.findByIdAndUpdate(req.body._id, req.body);

    await product?.save();

    res.json({ message: "Producto editado", user: req.body }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al editar producto", error });
  }
};

export const filterType = async (req: Request, res: Response) => {
  try {
    const data = await ProductModel.find({ type: req.params.type })
      .populate("categories")
      .populate("img");
    res.json({ data }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await ProductModel.find({ _id: req.params.id })
      .populate("categories")
      .populate("img");
    // console.log({ data });
    res.json({ data: data[0] }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};

// if (typeof filter === "object" && filter !== null) {
//   const filterProps = filter as Props;
//   if (filterProps.categories) {
//     // console.log(filterProps);

//     // if (filterProps.sub_categories) {
//     //   // console.log(filterProps.sub_categories.id);
//     //   const category = await CategoryModel.find({
//     //     title: filterProps?.categories.title,
//     //   });

//       const data = await ProductModel.find({
//         categories: category[0].id,
//         // sub_categories: filterProps.sub_categories.id,
//       })
//         .populate("categories")
//         .populate("img2")
//         .populate("img");

//       res.status(200).json({ data });
//     } else {
//       const category = await CategoryModel.find({
//         title: filterProps?.categories.title,
//       });

//       const data = await ProductModel.find({
//         categories: category[0].id,
//       })
//         .populate("categories")
//         .populate("img2")
//         .populate("img");

//       res.status(200).json({ data });
//     }
//   }
// try {
//   if (typeof filter === "object" && filter !== null) {
//     const filterProps = filter as Props;
// if (filterProps.categories) {
// console.log(filterProps);

// if (filterProps.sub_categories) {
//   // console.log(filterProps.sub_categories.id);
//   const category = await CategoryModel.find({
//     title: filterProps?.categories.title,
//   });

//     const data = await ProductModel.find({
//       categories: category[0].id,
//       // sub_categories: filterProps.sub_categories.id,
//     })
//       .populate("categories")
//       .populate("img2")
//       .populate("img");

//     res.status(200).json({ data });
//   } else {
//     const category = await CategoryModel.find({
//       title: filterProps?.categories.title,
//     });

//     const data = await ProductModel.find({
//       categories: category[0].id,
//     })
//       .populate("categories")
//       .populate("img2")
//       .populate("img");

//     res.status(200).json({ data });
//   }
// }
