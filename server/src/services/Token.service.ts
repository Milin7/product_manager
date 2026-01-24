import { generateRandomToken, hashToken } from "../utils/crypto.utils";
import {
  generateAccessToken,
  verifyAccessToken,
  calculateTokenExpiration,
} from "../utils/token.utils";
import { JwtPayload, DeviceInfo } from "../dto/product/auth/JwtPayload.dto";
import refreshTokenRepository from "../repositories/RefreshToken.repository";

/**
 * Token Service
 * Handles token generation, verification, and refresh logic
 */
class TokenService {
  /**
   * Generate access token for a user
   * @param userId - User ID
   * @param email - User email
   * @returns JWT access token (short-lived, 15 minutes)
   */
  generateAccessToken(userId: number, email: string): string {
    return generateAccessToken(userId, email);
  }

  /**
   * Verify and decode access token
   * @param token - JWT access token
   * @returns Decoded JWT payload
   * @throws Error if token is invalid or expired
   */
  verifyAccessToken(token: string): JwtPayload {
    return verifyAccessToken(token);
  }

  /**
   * Generate and store a new refresh token
   * Creates a cryptographically secure token, hashes it, and stores in database
   *
   * @param userId - User ID
   * @param deviceInfo - Device information from request
   * @returns Plain refresh token (to be sent to client in cookie)
   */
  async generateRefreshToken(
    userId: number,
    deviceInfo: DeviceInfo,
  ): Promise<string> {
    // Step 1: Generate cryptographically secure random token (64 hex chars)
    const plainToken = generateRandomToken(32); // 32 bytes = 64 hex characters

    // Step 2: Hash the token before storing (never store plain tokens in DB)
    const tokenHash = hashToken(plainToken);

    // Step 3: Calculate expiration date (7 days from now)
    const expiresAt = calculateTokenExpiration(
      process.env.JWT_REFRESH_EXPIRATION || "7d",
    );

    // Step 4: Store hashed token in database with device info
    await refreshTokenRepository.createRefreshToken({
      user_id: userId,
      token_hash: tokenHash,
      device_info: deviceInfo,
      expires_at: expiresAt,
    });

    // Step 5: Return plain token to be sent to client (only time we expose it)
    return plainToken;
  }

  /**
   * Verify refresh token and get user info
   * @param plainToken - Plain refresh token from client cookie
   * @returns User info from token or null if invalid
   */
  async verifyRefreshToken(
    plainToken: string,
  ): Promise<{ userId: number; email: string } | null> {
    // Step 1: Hash the incoming token to compare with database
    const tokenHash = hashToken(plainToken);

    // Step 2: Find token in database (also checks expiration via SQL)
    const tokenData = await refreshTokenRepository.findByTokenHash(tokenHash);

    if (!tokenData) {
      return null; // Token not found or expired
    }

    // Step 3: Update last_used_at timestamp (track token usage)
    await refreshTokenRepository.updateLastUsed(tokenHash);

    // Step 4: Return user info
    return {
      userId: tokenData.user_id,
      email: tokenData.user.email,
    };
  }

  /**
   * Refresh access token using refresh token
   * @param plainToken - Plain refresh token from client
   * @returns New access token or null if refresh token invalid
   */
  async refreshAccessToken(plainToken: string): Promise<string | null> {
    // Step 1: Verify refresh token
    const userData = await this.verifyRefreshToken(plainToken);

    if (!userData) {
      return null; // Invalid or expired refresh token
    }

    // Step 2: Generate new access token
    const newAccessToken = this.generateAccessToken(
      userData.userId,
      userData.email,
    );

    return newAccessToken;
  }

  /**
   * Revoke refresh token (logout single session)
   * @param plainToken - Plain refresh token from client
   */
  async revokeRefreshToken(plainToken: string): Promise<void> {
    const tokenHash = hashToken(plainToken);
    await refreshTokenRepository.deleteByTokenHash(tokenHash);
  }

  /**
   * Revoke all refresh tokens for a user (logout all sessions)
   * @param userId - User ID
   */
  async revokeAllUserTokens(userId: number): Promise<void> {
    await refreshTokenRepository.deleteAllByUserId(userId);
  }

  /**
   * Get all active sessions for a user
   * @param userId - User ID
   * @param currentTokenHash - Hash of current token (to mark as "current")
   * @returns Array of session information
   */
  async getUserSessions(userId: number, currentTokenHash?: string) {
    const sessions = await refreshTokenRepository.getUserSessions(userId);

    return sessions.map((session) => ({
      id: session.id,
      deviceInfo: session.device_info,
      createdAt: session.created_at,
      lastUsedAt: session.last_used_at,
      expiresAt: session.expires_at,
      isCurrent: session.token_hash === currentTokenHash,
    }));
  }

  /**
   * Revoke specific session by ID
   * @param sessionId - Session ID to revoke
   * @param userId - User ID (for authorization)
   * @returns True if session was deleted
   */
  async revokeSession(sessionId: number, userId: number): Promise<boolean> {
    return await refreshTokenRepository.deleteSession(sessionId, userId);
  }
}

// Export singleton instance
export default new TokenService();
