import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";


const orderRouter = Router();

orderRouter.get("/verify", auth("user","admin"), orderController.verifyPayment);
orderRouter.post("/", auth("user","admin"), orderController.createOrder);
orderRouter.get("/user-order",auth('user','admin'), orderController.getOrders);
orderRouter.patch(
  "/:orderId/status",
  auth("admin"),
  orderController.updateOrderStatus
);
orderRouter.delete("/:orderId", auth("admin"), orderController.deleteOrder);


export default orderRouter;
