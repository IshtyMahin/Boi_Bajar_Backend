import { Types } from "mongoose";

export type TBook = {
  name: string;
  authors: string[];
  category: Types.ObjectId;
  price: number;
  averageRating: number;
  quantity: number;
  image: string;
  isDeleted: boolean;
};
