import z from "zod";

const TransactionTypeSchema = z.enum(["income", "expense"]);
const TransactionDateSchema = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  })
  .transform((val) => new Date(val));

export const TransactionSummarySchema = z.object({
  id: z.number(),
  amount: z.coerce.number().positive(),
  type: TransactionTypeSchema,
  transactionDate: TransactionDateSchema,
  description: z.string().nullable().optional(),
  categoryName: z.string().nullable().optional(),
});

export const CreateTransactionSchema = z.object({
  amount: z.coerce.number().positive(),
  type: TransactionTypeSchema,
  description: z.string().nullable().optional(),
  transactionDate: TransactionDateSchema,
  categoryId: z.number(),
});

export const CreatedTransactionSchema = z.object({
  id: z.number(),
  amount: z.coerce.number(),
  type: TransactionTypeSchema,
  transactionDate: TransactionDateSchema,
  description: z.string().nullable().optional(),
});

export const TransactionSummaries = z.array(TransactionSummarySchema);
export type TransactionSummary = z.infer<typeof TransactionSummarySchema>;
export interface CreateTransactionParams extends CreateTransaction {
  userId: number;
}
type CreateTransaction = z.infer<typeof CreateTransactionSchema>;
export const TransactionType = TransactionTypeSchema.enum;
