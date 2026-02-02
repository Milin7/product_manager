export interface Transaction {
  id: number;
  amount: number;
  type: string;
  description: string;
  category_name: string;
}

export interface TransactionParams {
  userId: number;
  transactionId: number;
}
