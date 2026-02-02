import { CreateTransactionDto } from "../dto/transaction/CreateTransaction.dto";
import { TransactionResponseDto } from "../dto/transaction/TransactionResponse.dto";
import { Transaction, TransactionParams } from "../models/Transaction.model";
import { CategoryRepository } from "../repositories/Category.repository";
import { TransactionRepository } from "../repositories/Transaction.repository";
import UserRepository from "../repositories/User.repository";

export class TransactionService {
  private static toResponseDto(
    transaction: Transaction,
  ): TransactionResponseDto {
    return {
      id: transaction.id,
      transactionDate: transaction.transaction_date,
      description: transaction.description,
      type: transaction.type,
      amount: transaction.amount,
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

  static async createTransaction(
    userId: number,
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found.`);
    }

    if (createTransactionDto.categoryId) {
      const category = await CategoryRepository.getCategoryByIdAsync({
        userId,
        categoryId: createTransactionDto.categoryId,
      });
      if (!category) {
        throw new Error(
          `Category with id ${createTransactionDto.categoryId} not found for this user.`,
        );
      }
    }

    const createdTransaction =
      await TransactionRepository.createTransactionAsync(
        userId,
        createTransactionDto,
      );

    if (!createdTransaction) {
      throw new Error("Failed to create the transaction in the database.");
    }

    return this.toResponseDto(createdTransaction);
  }
}
