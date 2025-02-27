import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  transaction: {
    id: { type: String },
    transactionStatus: { type: String },
    bank_status: { type: String },
    sp_code: { type: Number },
    sp_message: { type: String },
    method: { type: String },
    date_time: { type: String },
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Cancelled"],
    default: "Pending",
  },
});

const Order = model("Order", orderSchema);
export default Order;
