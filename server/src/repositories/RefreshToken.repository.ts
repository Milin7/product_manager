import pool from "../config/db";
import {
  CreateRefreshTokenInput,
  RefreshToken,
  RefreshTokenWithUser,
} from "../models/RefreshToken.model";

class RefreshTokenRepository {
  async createRefreshToken(
    input: CreateRefreshTokenInput,
  ): Promise<RefreshToken> {
    const { user_id, token_hash, device_info, expires_at } = input;
    const result = await pool.query<RefreshToken>(
      "INSERT INTO refresh_tokens (user_id, token_hash, device_info, expires_at) VALUES ($1, $2, $3, $4)",
      [user_id, token_hash, device_info, expires_at],
    );
    return result.rows[0];
  }

  async findByTokenHash(
    tokenHash: string,
  ): Promise<RefreshTokenWithUser | null> {
    const result = await pool.query<RefreshTokenWithUser>(
      "SELECT rt.id, rt.user_id, rt.token_hash, rt.device_info, rt.expires_at, rt.created_at, rt.last_used_at, json_build_object('id', u.id, 'email', u.email) as user FROM refresh_tokens rt INNER JOIN users u ON rt.user_id = u.id WHERE rt.token_hash = $1 AND rt.expires_at > NOW()",
      [tokenHash],
    );
    return result.rows[0] || null;
  }

  async getUserSessions(userId: number): Promise<RefreshToken[]> {
    const result = await pool.query<RefreshToken>(
      "SELECT id, user_id, token_hash, device_info, expires_at, created_at, last_used_at FROM refresh_tokens WHERE user_id = $1 AND expires_at > NOW() ORDER BY last_used_at DESC",
      [userId],
    );
    return result.rows;
  }

  async updateLastUsed(tokenHash: string): Promise<void> {
    const query = `
      UPDATE refresh_tokens
      SET last_used_at = NOW()
      WHERE token_hash = $1
    `;

    await pool.query(query, [tokenHash]);
  }

  async deleteByTokenHash(tokenHash: string): Promise<void> {
    const query = `DELETE FROM refresh_tokens WHERE token_hash = $1`;
    await pool.query(query, [tokenHash]);
  }

  async deleteSession(sessionId: number, userId: number): Promise<boolean> {
    const query = `
      DELETE FROM refresh_tokens
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `;

    const result = await pool.query(query, [sessionId, userId]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  async deleteAllByUserId(userId: number): Promise<void> {
    const query = `DELETE FROM refresh_tokens WHERE user_id = $1`;
    await pool.query(query, [userId]);
  }

  async deleteExpiredTokens(): Promise<number> {
    const query = `
      DELETE FROM refresh_tokens
      WHERE expires_at < NOW()
      RETURNING id
    `;

    const result = await pool.query(query);
    return result.rowCount || 0;
  }

  async countUserSessions(userId: number): Promise<number> {
    const query = `
      SELECT COUNT(*) as count
      FROM refresh_tokens
      WHERE user_id = $1 AND expires_at > NOW()
    `;

    const result = await pool.query<{ count: string }>(query, [userId]);
    return parseInt(result.rows[0].count);
  }
}

export default new RefreshTokenRepository();
