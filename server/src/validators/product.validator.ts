import { z } from "zod";

export const productIdSchema = z.object({
  params: z.object({
    id: z.string().transform(Number),
  }),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).trim(),
    price: z.number().positive(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().transform(Number),
  }),
  body: z.object({
    name: z.string().min(1).max(100).trim(),
    price: z.number().positive(),
    availability: z.boolean(),
  }),
});

export const patchProductSchema = z.object({
  params: z.object({
    id: z.string().transform(Number),
  }),
  body: z.object({
    name: z.string().min(1).max(100).trim().optional(),
    price: z.number().positive().optional(),
    availability: z.boolean().optional(),
  }),
});

export type ProductIdInput = z.infer<typeof productIdSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type PatchProductInput = z.infer<typeof patchProductSchema>;
