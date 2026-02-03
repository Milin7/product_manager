import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  categoryName: z.string(),
  userId: z.number(),
  categoryDescription: z.string().optional(),
});

export const CategoriesSchema = z.array(CategorySchema);

export type Category = z.infer<typeof CategorySchema>;
