import Order from "./order.model";
import { TUser } from "../user/user.interface";
import { Book } from "../book/book.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { orderUtils } from "./order.utils";
import { ClientSession, FilterQuery } from "mongoose";

interface OrderPayload {
  product: string;
  quantity: number;
}

const createOrder = async (
  user: TUser,
  payload: OrderPayload,
  client_ip: string
): Promise<string> => {
  const { product: productId, quantity } = payload;

  const product = await Book.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  if (product.quantity < quantity) {
    throw new AppError(httpStatus.BAD_REQUEST, "Insufficient product quantity");
  }

  const totalPrice = product.price * quantity;

  const order = await Order.create({
    user: user._id,
    product: productId,
    quantity,
    totalPrice,
  });

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id.toString(),
    currency: "BDT",
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  return payment.checkout_url;
};

const getOrders = async (userId: string, role: string) => {
  const filter: FilterQuery<typeof Order> = role === "admin" ? {} : { user: userId };
  return await Order.find(filter).populate("user").populate("product");
};

const verifyPayment = async (order_id: string) => {
  let session: ClientSession | null = null;

  try {
    session = await Order.startSession();
    session.startTransaction();

    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
    if (!verifiedPayment.length) throw new AppError(httpStatus.NOT_FOUND, "Payment not found");

    const paymentData = verifiedPayment[0];
    const order = await Order.findByIdAndUpdate(
      paymentData?.customer_order_id,
      {
        transaction: {
          id: paymentData.bank_trx_id,
          transactionStatus: paymentData.bank_status,
          bank_status: paymentData.bank_status,
          sp_code: paymentData.sp_code,
          sp_message: paymentData.sp_message,
          method: paymentData.method,
          date_time: paymentData.date_time,
        },
        status:
          paymentData.bank_status === "Success"
            ? "Paid"
            : paymentData.bank_status === "Failed"
            ? "Pending"
            : paymentData.bank_status === "Cancel"
            ? "Cancelled"
            : "Pending",
      },
      { new: true, session }
    );

    if (paymentData.bank_status === "Success" && order) {
      await Book.findByIdAndUpdate(
        order.product,
        { $inc: { quantity: -order.quantity } },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    return verifiedPayment;
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    throw error;
  }
};

const updateOrderStatus = async (orderId: string, status: string) => {
  const allowedStatuses = ["Pending", "Paid", "Cancelled"];
  if (!allowedStatuses.includes(status)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid order status");
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }

  return order;
};

const deleteOrder = async (orderId: string) => {
  const order = await Order.findByIdAndDelete(orderId);

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }

  return { message: "Order deleted successfully" };
};

export const orderService = {
  createOrder,
  getOrders,
  verifyPayment,
  updateOrderStatus,
  deleteOrder,
};
