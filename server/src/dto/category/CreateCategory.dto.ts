import { TransactionType } from "../../models/Transaction.model";

export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface CreateCategory {
  id: number;
  amount: number;
  type: TransactionType;
  description: string;
  transaction_date: Date;
}
