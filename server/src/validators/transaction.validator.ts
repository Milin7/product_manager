import z from "zod";

export const transactionUserIdSchema = z.object({
  params: z.object({
    userId: z.string().transform(Number),
  }),
});

export const transactionAndUserSchema = z.object({
  params: z.object({
    userId: z.string().transform(Number),
    transactionId: z.string().transform(Number),
  }),
});

export const createTransactionSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    type: z.enum(["income", "expense"]),
    transactionDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .transform((val) => new Date(val)),
    description: z.string().optional(),
    categoryId: z.number().optional(),
  }),
  params: z.object({
    userId: z.string().transform(Number),
  }),
});

export type TransactionUserId = z.infer<typeof transactionUserIdSchema>;
export type TransactionAndUser = z.infer<typeof transactionAndUserSchema>;
export type CreateTransaction = z.infer<typeof createTransactionSchema>;
