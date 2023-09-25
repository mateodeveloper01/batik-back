import { Request, Response } from "express";
import mercadopago from "mercadopago";
import createMpPreference from "../helpers/mercadopago.js";
import OrderModel from "../models/order";
import { FRONTEND_CLIENT_URL } from "../config.js";
import PaymentModel from "../models/payments";
export const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await createMpPreference(req.body);
    res.send({ url: result.body.init_point }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al crear referencia", error });
  }
};

export const success = async (req: Request, res: Response) => {
  try {
    res.redirect(`${FRONTEND_CLIENT_URL}/acount`);
  } catch (error) {
    res.status(404).json({ message: "Error al logear usuario", error });
  }
};
export const failure = async (req: Request, res: Response) => {
  try {
    console.log(req.params.preferences_id);
    res.redirect(`${FRONTEND_CLIENT_URL}/acount`);

    res.send("failure");
  } catch (error) {
    res.status(404).json({ message: "Error al logear usuario", error });
  }
};
export const pending = async (req: Request, res: Response) => {
  try {
    console.log(req.params.preferences_id);
    res.redirect(`${FRONTEND_CLIENT_URL}/acount`);

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
      await PaymentModel.create({ data });
      await OrderModel.findByIdAndUpdate(
        { _id: data.response.metadata.order_id },
        { paymentStatus: "success" }
      );
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "Error al logear usuario", error });
  }
};
