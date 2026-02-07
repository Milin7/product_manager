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
  amount: z.coerce.number(),
  description: z.string().nullable().optional(),
  type: TransactionTypeSchema,
  transactionDate: TransactionDateSchema,
  categoryName: z.string().nullable().optional(),
});

export const CreateTransactionSchema = z.object({
  amount: z.coerce.number(),
  description: z.string().nullable().optional(),
  type: TransactionTypeSchema,
  transactionDate: TransactionDateSchema,
  categoryId: z.number().nullable().optional(),
});

const CreateTransactionParams = CreateTransactionSchema.extend({
  userId: z.number(),
});

export const TransactionSummaries = z.array(TransactionSummarySchema);
export type TransactionSummary = z.infer<typeof TransactionSummarySchema>;
export type CreateTransactionParams = z.infer<typeof CreateTransactionParams>;
export const TransactionType = TransactionTypeSchema.enum;
