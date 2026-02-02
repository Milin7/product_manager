export interface TransactionResponseDto {
  id: number;
  amount: number;
  type: string;
  description: string;
  categoryName: string;
  transactionDate: Date;
}
