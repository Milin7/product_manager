import { z } from "zod";

export const DraftCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  user_id: z.number(),
  description: z.string().optional(),
});

export const ProductsSchema = z.array(CategorySchema);

export type Category = z.infer<typeof CategorySchema>;
export type DraftCategory = z.infer<typeof DraftCategorySchema>;
