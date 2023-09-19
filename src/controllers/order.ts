import { Request, Response } from "express";
import OrderModel from "../models/order";
import mercadopago from "mercadopago";

export const all = async (req: Request, res: Response) => {
  const data = await OrderModel.find({});
  
  try {
    res.status(200).json({ message: "Ordenes encontradas", data });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
