import { Request, Response } from "express";
import mercadopago from "mercadopago";
import "dotenv/config";
import { orderProp } from "../types/types";
import {
  PreferenceItem,
  PreferencePayer,
  PreferenceShipment,
} from "mercadopago/models/preferences/create-payload.model";
import OrderModel from "../models/order";
export const createOrder = async (req: Request, res: Response) => {
  const { billing, products, shipping, user }: orderProp = req.body;
  const items: PreferenceItem[] = products.map((i) => {
    const { title, description, img, quantity, id, isNew, price } = i;
    return {
      title,
      description,
      picture_url: img,
      quantity,
      currency_id: "ARS",
      unit_price: Number(price),
    };
  });

  const payer: PreferencePayer = {
    name: billing.name || shipping.name,
    surname: billing.surname || shipping.surname,
    email: user.email,
    address: {
      street_name: billing.street_name || shipping.street_name,
      street_number:
        Number(billing.street_number) || Number(shipping.street_number),
    },
    identification: {
      type: billing.identification_type,
      number: billing.identification_num,
    },
    // phone: {
    //   number: billing.phone_num || shipping.phone_number,
    //   area_code: `+54${billing.phone_area_code || shipping.phone_area_code}`,
    // },
  };

  const shipments: PreferenceShipment = {
    mode: "not_specified",
    cost: 100,
    free_shipping: false,
    receiver_address: {
      zip_code: shipping.zip_code,
      street_name: shipping.street_name,
      city_name: shipping.city,
      street_number: Number(shipping.street_number),
      floor: shipping.floor,
      apartment: undefined,
      state_name: shipping.province,
    },
  };
  try {
    const result = await mercadopago.preferences.create({
      items,
      payer,
      shipments,
      back_urls: {
        success: `${process.env.LOCAL_URL}/api/mp/success`,
        failure: `${process.env.LOCAL_URL}/api/mp/failure`,
        pending: `${process.env.LOCAL_URL}/api/mp/pending`,
      },
      notification_url: `https://aea8-168-90-72-99.ngrok-free.app/api/mp/webhook`,
      external_reference: "http://localhost:3000/acount",
      marketplace: 'estoyre-loc123',
    });
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
