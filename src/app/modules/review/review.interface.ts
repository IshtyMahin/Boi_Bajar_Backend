import { Document, Types } from "mongoose";

export interface TReview extends Document {
  user: Types.ObjectId;
  book: Types.ObjectId;
  message: string;
  star: number;
}
