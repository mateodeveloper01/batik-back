import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
  data: Object,
});

const PaymentModel = model("Payment", paymentSchema);

export default PaymentModel;
