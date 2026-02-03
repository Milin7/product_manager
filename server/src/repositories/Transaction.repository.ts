import pool from "../config/db";
import { CreateTransactionDto } from "../dto/transaction/CreateTransaction.dto";
import { Transaction, TransactionParams } from "../models/Transaction.model";

export class TransactionRepository {
  static async getAllTransactionsByIdAsync(
    userId: number,
  ): Promise<Transaction[]> {
    const query = `
    SELECT 
      t.id,
      t.transaction_date,
      t.amount,
      t.type,
      t.description,
      c.name category_name
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1
    ORDER BY t.created_at DESC 
    `;
    const result = await pool.query<Transaction>(query, [userId]);
    return result.rows;
  }

  static async getTransactionByIdAsync(
    params: TransactionParams,
  ): Promise<Transaction | null> {
    const { userId, transactionId } = params;
    const query = `
    SELECT 
      t.id,
      t.transaction_date,
      t.amount,
      t.type,
      t.description,
      c.name category_name
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1
      AND t.id = $2
    ORDER BY t.created_at DESC
    `;
    const result = await pool.query<Transaction>(query, [
      userId,
      transactionId,
    ]);
    return result.rows[0] || null;
  }

  static async createTransactionAsync(
    userId: number,
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { amount, type, transactionDate, description, categoryId } =
      createTransactionDto;
    const query = `
    INSERT INTO transactions (user_id, amount, type, description, transaction_date, category_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, amount, type, description, transaction_date, category_id
    `;
    const result = await pool.query<Transaction>(query, [
      userId,
      amount,
      type,
      description,
      transactionDate,
      categoryId,
    ]);
    return result.rows[0];
  }
}
