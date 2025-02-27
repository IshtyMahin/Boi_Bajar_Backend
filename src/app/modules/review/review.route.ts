import express from "express";
import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { reviewValidationSchema } from "./review.validation";

const router = express.Router();

router.post(
  "/",
  auth("admin", "user"),
  validateRequest(reviewValidationSchema),
  ReviewController.createReview
);

router.get("/:bookId", ReviewController.getReviewsByBook);

export const ReviewRoutes = router;
