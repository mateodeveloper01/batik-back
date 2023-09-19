import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  data: Object,
});

const OrderModel = model("Order", orderSchema);

export default OrderModel;
