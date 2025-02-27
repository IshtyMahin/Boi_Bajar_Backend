/* eslint-disable @typescript-eslint/no-explicit-any */
// book.model.ts content

import { model, Schema } from "mongoose";
import { TBook } from "./book.interface";



const bookSchema = new Schema<TBook>(
  {
    name: { type: String, required: true },
    authors: { type: [String], required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true },
    averageRating: { type: Number, default: 0 },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

bookSchema.pre(/^find/, function (this: any, next) {
  this.find({ deleted: { $ne: true } }); 
  next();
});

export const Book = model<TBook>("Book", bookSchema);
