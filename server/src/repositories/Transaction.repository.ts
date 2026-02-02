import pool from "../config/db";
import { Transaction, TransactionParams } from "../models/Transaction.model";

export class TransactionRepository {
  static async getAllTransactionsByIdAsync(
    userId: number,
  ): Promise<Transaction[]> {
    const query = `
    SELECT 
      t.id,
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
}
