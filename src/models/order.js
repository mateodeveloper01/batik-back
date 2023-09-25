import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  products: [
    {
      category_id: String,
      description: String,
      id: String,
      picture_url: String,
      quantity: String,
      title: String,
      unit_price: String,
    },
  ],
  shipments: {
    city_name: String,
    state_name: String,
    street_name: String,
    street_number: String,
    zip_code: String,
  },
  payer: {
    first_name: String,
    last_name: String,
    email:String
  },
  paymentStatus: { type: String, enum: ["success", "pending", "cancel"] },
});

const OrderModel = model("Order", orderSchema);

export default OrderModel;
