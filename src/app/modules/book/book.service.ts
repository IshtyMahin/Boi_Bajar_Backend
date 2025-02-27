/* eslint-disable @typescript-eslint/no-explicit-any */

import { TBook } from "./book.interface";
import { Book } from "./book.model";

const createBookIntoDB = async (payload: TBook) => {
  const result = await Book.create(payload);
  return result;
};

const getBooksFromDB = async (query: any) => {
  const {
    search,
    price,
    author,
    categoryId,
    quantity,
    page = 1,
    limit = 4,
  } = query;

  const filters: any = { isDeleted: { $ne: true } };

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { authors: { $regex: search, $options: "i" } },
    ];
  }

  if (price?.gte || price?.lte) {
    filters.price = {};
    if (price.gte) filters.price.$gte = Number(price.gte);
    if (price.lte) filters.price.$lte = Number(price.lte);
  }

  if (author) {
    filters.authors = { $regex: author, $options: "i" };
  }

  if (categoryId) {
    filters.category = categoryId;
  }

  if (quantity?.gt) {
    filters.quantity = { $gt: 0 };
  }

  const skip = (page - 1) * limit;

  const books = await Book.find(filters)
    .skip(skip)
    .limit(limit)
    .populate("category");

  const total = await Book.countDocuments(filters);
  const totalPage = Math.ceil(total / limit);

  return {
    books,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPage,
    },
  };
};

const getSingleBookFromDB = async (id: string) => {
  const result = await Book.findById(id).populate("category");

  return result;
};

const updateBookInDB = async (id: string, payload: Partial<TBook>) => {
  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate("category");
  return result;
};

const deleteBookFromDB = async (id: string) => {
  const result = await Book.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const BookService = {
  createBookIntoDB,
  getBooksFromDB,
  getSingleBookFromDB,
  updateBookInDB,
  deleteBookFromDB,
};
