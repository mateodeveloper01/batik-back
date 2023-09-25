import mercadopago from "mercadopago";
import { LOCAL_URL, HTTPS_URL, FRONTEND_CLIENT_URL } from "./../config.ts";
import OrderModel from "../models/order.ts";
const createMpPreference = async ({ billing, products, shipping, user }) => {
  const payer = {
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

  const shipments = {
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
  const items = products.map((i) => {
    const { title, description, img, quantity, price } = i;
    return {
      title,
      description,
      picture_url: img,
      quantity,
      currency_id: "ARS",
      unit_price: Number(price),
    };
  });

  const data = await OrderModel.create({
    products: items,
    shipments: shipments.receiver_address,
    payer: {
      first_name: billing.name || shipping.name,
      last_name: billing.surname || shipping.surname,
      email:user.email
    },
    paymentStatus: "pending",
  });
  const result = await mercadopago.preferences.create({
    items,
    payer,
    shipments,
    metadata: { email: user.email, order_id: data._id },
    back_urls: {
      success: `${LOCAL_URL}/api/mp/success`,
      failure: `${LOCAL_URL}/api/mp/failure`,
      pending: `${LOCAL_URL}/api/mp/pending`,
    },
    notification_url: HTTPS_URL
      ? `${HTTPS_URL}/api/mp/webhook`
      : `${LOCAL_URL}/api/mp/webhook`,
    external_reference: `${FRONTEND_CLIENT_URL}/acount`,
  });

  return result;
};

export default createMpPreference;
