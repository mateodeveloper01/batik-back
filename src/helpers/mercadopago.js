import mercadopago from "mercadopago";
import { LOCAL_URL, HTTPS_URL, FRONTEND_CLIENT_URL } from "../config";
import createOrderHelper from "./createOrder";
const createMpPreference = async (body) => {
  const data = await createOrderHelper(body);

  const items = body.products.map((i) => {
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
  const result = await mercadopago.preferences.create({
    items,
    metadata: { email: body.user.email, order_id: data._id },
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
// const payer = {
//   name: billing.name || shipping.name,
//   surname: billing.surname || shipping.surname,
//   email: user.email,
//   address: {
//     street_name: billing.street_name || shipping.street_name,
//     street_number:
//       Number(billing.street_number) || Number(shipping.street_number),
//   },
//   identification: {
//     type: billing.identification_type,
//     number: billing.identification_num,
//   },
//   // phone: {
//   //   number: billing.phone_num || shipping.phone_number,
//   //   area_code: `+54${billing.phone_area_code || shipping.phone_area_code}`,
//   // },
// };
