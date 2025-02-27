import express from "express";
import { BookController } from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookValidationSchema } from "./book.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-book",
  auth("admin"),
  validateRequest(bookValidationSchema),
  BookController.createBook
);
router.get("/", BookController.getBooks);
router.get("/:id", BookController.getSingleBook);
router.patch("/:id",auth('admin'), BookController.updateBook);
router.delete("/:id", auth("admin"), BookController.deleteBook);

export const BookRouter = router;
