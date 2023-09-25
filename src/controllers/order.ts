import { Request, Response } from "express";
import OrderModel from "../models/order";
import PaymentModel from "../models/payments";

export const all = async (req: Request, res: Response) => {
  try {
    const data = await OrderModel.find({});
    // console.log(data);
    res.status(200).json({ message: "Ordenes encontradas", data });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
export const findByEmail = async (req: Request, res: Response) => {
  try {
    const data = await OrderModel.find({
      "payer.email": req.params.email,
    });
    res.status(200).json({ message: "Ordenes encontradas", data });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
