import { Request, Response } from "express";
import mercadopago from "mercadopago";
import "dotenv/config";
import { orderProp } from "../types/types";
import {
  PreferenceItem,
  PreferencePayer,
  PreferenceShipment,
} from "mercadopago/models/preferences/create-payload.model";
import createMpPreference from '../helpers/mercadopago.js';
import OrderModel from "../models/order";
export const createOrder = async (req: Request, res: Response) => {
  // const { billing, products, shipping, user }: orderProp = req.body;

  try {
   const result = await createMpPreference(req.body)
    res.send({ url: result.body.init_point }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al logear usuario", error });
  }
};
export const success = async (req: Request, res: Response) => {
  try {
    res.redirect("http://localhost:3000/acount");
  } catch (error) {
    res.status(404).json({ message: "Error al logear usuario", error });
  }
};
export const failure = async (req: Request, res: Response) => {
  try {
    console.log(req.params.preferences_id);

    res.send("failure");
  } catch (error) {
    res.status(404).json({ message: "Error al logear usuario", error });
  }
};
export const pending = async (req: Request, res: Response) => {
  try {
    console.log(req.params.preferences_id);

    res.send("pending");
  } catch (error) {
    res.status(404).json({ message: "Error al logear usuario", error });
  }
};
export const webhook = async (req: Request, res: Response) => {
  const payment = req.query as { type: string; "data.id": string };
  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(
        Number(payment["data.id"])
      );
      await OrderModel.create({ data });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "Error al logear usuario", error });
  }
};
