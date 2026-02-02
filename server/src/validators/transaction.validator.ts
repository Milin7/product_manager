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

export type TransactionUserId = z.infer<typeof transactionUserIdSchema>;
export type TransactionAndUser = z.infer<typeof transactionAndUserSchema>;
