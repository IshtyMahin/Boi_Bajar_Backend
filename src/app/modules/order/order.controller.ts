import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";
import httpStatus from "http-status";

const createOrder = catchAsync(async (req, res) => {
  const user = req?.user?.user;

  const order = await orderService.createOrder(user, req.body, req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;
  const role = req?.user?.role;

  const order = await orderService.getOrders(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order retrieved successfully",
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order verified successfully",
    data: order,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const updatedOrder = await orderService.updateOrderStatus(orderId, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order status updated successfully",
    data: updatedOrder,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const result = await orderService.deleteOrder(orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order deleted successfully",
    data: result,
  });
});

export const orderController = {
  createOrder,
  getOrders,
  verifyPayment,
  updateOrderStatus,
  deleteOrder,
};
