import { TransactionType } from "../../models/Transaction.model";

export interface CreateTransactionDto {
  amount: number;
  type: TransactionType;
  transactionDate: Date;
  description?: string;
  categoryId?: number;
}
