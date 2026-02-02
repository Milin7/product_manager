import z from "zod";

export const userIdCategorySchema = z.object({
  params: z.object({
    userId: z.string().transform(Number),
  }),
});

export const categoryAndUserIdSchema = z.object({
  params: z.object({
    userId: z.string().transform(Number),
    categoryId: z.string().transform(Number),
  }),
});

export type CategoryIdInput = z.infer<typeof userIdCategorySchema>;
export type CategoryAndUserId = z.infer<typeof categoryAndUserIdSchema>;
