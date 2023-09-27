import OrderModel from "../models/order";

const createOrderHelper = async ({
  products,
  shipping,
  user,
  paymentMethod,
}) => {
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
  try {
    const data = await OrderModel.create({
      products: items,
      shipments: {
        shippingMethod: shipping.shippingMethod,
        zip_code: shipping.zip_code || null,
        street_name: shipping.street_name || null,
        city_name: shipping.city || null,
        street_number: Number(shipping.street_number) || null,
        floor: shipping.floor || null,
        apartment: undefined,
        state_name: shipping.province || null,
      },
      payer: {
        first_name: shipping.name,
        last_name: shipping.surname,
        email: user.email,
      },
      payment: { paymentStatus: "pending", paymentMethod },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default createOrderHelper;
