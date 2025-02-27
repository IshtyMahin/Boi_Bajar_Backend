import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import authRouter from "./app/modules/auth/auth.route";
import userRouter from "./app/modules/user/user.route";
import { BookRouter } from "./app/modules/book/book.route";
import { CategoryRouter } from "./app/modules/category/category.route";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import orderRouter from "./app/modules/order/order.route";
import { ReviewRoutes } from "./app/modules/review/review.route";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ["https://boi-bajar.vercel.app","http://localhost:5173"], credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/books", BookRouter);
app.use("/api/books/order", orderRouter);
app.use("/api/books/reviews", ReviewRoutes);
app.use("/api/book/category", CategoryRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Server live",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
