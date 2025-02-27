import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { ReviewService } from "./review.service";
import sendResponse from "../../utils/sendResponse";

// Create a review
const createReview = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;
  
  const result = await ReviewService.createReview({
    ...req.body,
    user: userId,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Review created successfully",
    data: result,
  });
});

const getReviewsByBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const result = await ReviewService.getReviewsByBook(bookId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReviewsByBook,
};
