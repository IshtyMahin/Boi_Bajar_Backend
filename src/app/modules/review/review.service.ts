import mongoose from "mongoose";
import { Review } from "./review.model";
import { Book } from "../book/book.model";
import { TReview } from "./review.interface";

const createReview = async (payload: TReview) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { book } = payload;

    const review = await Review.create([payload], { session });

    const reviews = await Review.find({ book }).session(session);
    const totalStars = reviews.reduce((sum, review) => sum + review.star, 0);
    const averageRating = totalStars / reviews.length;

    await Book.findByIdAndUpdate(
      book,
      { averageRating: parseFloat(averageRating.toFixed(2)) },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return review[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getReviewsByBook = async (bookId: string) => {
  return await Review.find({ book: bookId })
    .populate("user", "-password")
    .populate("book");
};

export const ReviewService = {
  createReview,
  getReviewsByBook,
};
