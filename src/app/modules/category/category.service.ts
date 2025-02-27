import { TCategory } from "./category.interface";
import Category from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};


const getCategoriesFromDB = async () => {
  const result = await Category.find();
  return result;
};


const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};


const updateCategoryInDB = async (id: string, payload: Partial<TCategory>) => {
  const result = await Category.findByIdAndUpdate(id, payload, { new: true });
  return result;
};


const deleteCategoryFromDB = async (id: string) => {
  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const CategoryService = {
  createCategoryIntoDB,
  getCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryInDB,
  deleteCategoryFromDB,
};
