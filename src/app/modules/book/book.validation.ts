import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

const bookValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Book name is required"),
    authors: z
      .array(z.string().min(1, "Author name cannot be empty"))
      .nonempty("At least one author is required"),
    category: z.string().min(1, "Category ID is required"),
    price: z.number().min(0, "Price must be a positive number"),
    averageRating: z.number().min(0).max(5, "Rating must be between 0 and 5").default(0),
    quantity: z.number().min(0, "Quantity must be a positive number"),
    image: z.string().url("Image must be a valid URL").optional(),
  }),
});

export { categorySchema, bookValidationSchema };
