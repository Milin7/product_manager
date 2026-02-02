import { TransactionResponseDto } from "../dto/transaction/TransactionResponse.dto";
import { Transaction, TransactionParams } from "../models/Transaction.model";
import { TransactionRepository } from "../repositories/Transaction.repository";

export class TransactionService {
  private static toResponseDto(
    transaction: Transaction,
  ): TransactionResponseDto {
    return {
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
      description: transaction.description,
      categoryName: transaction.category_name,
    };
  }

  static async getAllTransactionsById(
    userId: number,
  ): Promise<TransactionResponseDto[]> {
    const transactions =
      await TransactionRepository.getAllTransactionsByIdAsync(userId);

    return transactions.map((t) => this.toResponseDto(t));
  }

  static async getTransactionById(
    params: TransactionParams,
  ): Promise<TransactionResponseDto> {
    const transaction =
      await TransactionRepository.getTransactionByIdAsync(params);

    if (!transaction) {
      throw new Error("This transaction doesn't exist");
    }
    return this.toResponseDto(transaction);
  }
}
