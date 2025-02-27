import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-category",
  auth("admin"),
  CategoryController.createCategory
);
router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getSingleCategory);
router.patch("/:id", auth("admin"), CategoryController.updateCategory);
router.delete("/:id", auth("admin"), CategoryController.deleteCategory);

export const CategoryRouter = router;
