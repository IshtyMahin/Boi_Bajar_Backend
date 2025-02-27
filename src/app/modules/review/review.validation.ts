import { z } from "zod";

export const reviewValidationSchema = z.object({
  body: z.object({
    book: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid book ID"),
    message: z.string().min(1, "Message is required"),
    star: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  }),
});
