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

export const updateCategorySchema = z.object({
  body: z
    .object({
      name: z.string().min(1),
      description: z.string().nullable().optional(),
    })
    .partial()
    .refine(
      (data) => data.name !== undefined || data.description !== undefined,
      {
        message: "Either category name or description must be provided",
      },
    ),
  params: z.object({
    userId: z.string().transform(Number),
    categoryId: z.string().transform(Number),
  }),
});

export type CategoryIdInput = z.infer<typeof userIdCategorySchema>;
export type CategoryAndUserId = z.infer<typeof categoryAndUserIdSchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
