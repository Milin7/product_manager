import pool from "../config/db";
import { User } from "../models/User.model";

class UserRepository {
  async createUser(email: string, passwordHash: string): Promise<User> {
    const result = await pool.query<User>(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, password_hash, created_at, updated_at",
      [email, passwordHash],
    );
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query<User>(
      "SELECT id, email, password_hash, created_at, updated_at FROM users WHERE email = $1"[
        email
      ],
    );
    return result.rows[0] || null;
  }

  async findById(id: number): Promise<User | null> {
    const result = await pool.query<User>(
      "SELECT id, email, password_hash, created_at, updated_at FROM users WHERE id = $1",
      [id],
    );
    return result.rows[0] || null;
  }

  async emailExists(email: string): Promise<boolean> {
    const result = await pool.query<{ exists: boolean }>(
      "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1) as exists",
      [email],
    );
    return result.rows[0].exists;
  }

  async updatePassword(userId: number, newPasswordHash: string): Promise<void> {
    await pool.query(
      "UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2",
      [newPasswordHash, userId],
    );
  }

  async deleteUser(userId: number): Promise<void> {
    await pool.query("DELETE FROM users WHERE id = $1", [userId]);
  }
}

export default new UserRepository();
