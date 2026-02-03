export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  description: string;
  category_name: string;
  transaction_date: Date;
}

export interface TransactionParams {
  userId: number;
  transactionId: number;
}
