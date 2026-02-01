import { hashPassword, comparePassword } from "../utils/crypto.utils";
import { toSafeUser } from "../models/User.model";
import userRepository from "../repositories/User.repository";
import tokenService from "./Token.service";
import { AuthResponseDto } from "../dto/product/auth/AuthResponse.dto";
import { DeviceInfo } from "../dto/product/auth/JwtPayload.dto";
import { SessionInfoDto } from "../dto/product/auth/SessionInfo.dto";

/**
 * Auth Service
 * Handles user authentication and authorization logic
 */
class AuthService {
  /**
   * Register a new user
   *
   * Steps:
   * 1. Check if email already exists
   * 2. Hash password with bcrypt
   * 3. Create user in database
   * 4. Generate tokens (access + refresh)
   * 5. Return user info and tokens
   *
   * @param email - User email
   * @param password - Plain text password
   * @param deviceInfo - Device information from request
   * @returns Auth response with tokens and user info
   * @throws Error if email already exists
   */
  async register(
    email: string,
    password: string,
    deviceInfo: DeviceInfo,
  ): Promise<{ authResponse: AuthResponseDto; refreshToken: string }> {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const passwordHash = await hashPassword(password);
    const user = await userRepository.createUser(email, passwordHash);

    const accessToken = tokenService.generateAccessToken(user.id, user.email);
    const refreshToken = await tokenService.generateRefreshToken(
      user.id,
      deviceInfo,
    );

    return {
      authResponse: {
        accessToken,
        user: toSafeUser(user),
      },
      refreshToken,
    };
  }

  /**
   * Login existing user
   *
   * Steps:
   * 1. Find user by email
   * 2. Verify password matches hash
   * 3. Generate tokens (access + refresh)
   * 4. Return user info and tokens
   *
   * @param email - User email
   * @param password - Plain text password
   * @param deviceInfo - Device information from request
   * @returns Auth response with tokens and user info
   * @throws Error if credentials are invalid
   */
  async login(
    email: string,
    password: string,
    deviceInfo: DeviceInfo,
  ): Promise<{ authResponse: AuthResponseDto; refreshToken: string }> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const accessToken = tokenService.generateAccessToken(user.id, user.email);
    const refreshToken = await tokenService.generateRefreshToken(
      user.id,
      deviceInfo,
    );

    return {
      authResponse: {
        accessToken,
        user: toSafeUser(user),
      },
      refreshToken,
    };
  }

  /**
   * Refresh access token using refresh token
   * @param refreshToken - Plain refresh token from cookie
   * @returns New access token
   * @throws Error if refresh token is invalid
   */
  async refreshAccessToken(refreshToken: string): Promise<string> {
    const newAccessToken = await tokenService.refreshAccessToken(refreshToken);

    if (!newAccessToken) {
      throw new Error("Invalid or expired refresh token");
    }

    return newAccessToken;
  }

  async logout(refreshToken: string): Promise<void> {
    await tokenService.revokeRefreshToken(refreshToken);
  }

  /**
   * Logout all sessions for a user
   * @param userId - User ID
   */
  async logoutAll(userId: number): Promise<void> {
    await tokenService.revokeAllUserTokens(userId);
  }

  /**
   * Get all active sessions for a user
   * @param userId - User ID
   * @param currentRefreshToken - Current refresh token (to mark as "current")
   * @returns Array of session information
   */
  async getUserSessions(
    userId: number,
    currentRefreshToken?: string,
  ): Promise<SessionInfoDto[]> {
    const currentTokenHash = currentRefreshToken
      ? require("../utils/crypto.utils").hashToken(currentRefreshToken)
      : undefined;

    return await tokenService.getUserSessions(userId, currentTokenHash);
  }

  /**
   * Revoke specific session
   * @param sessionId - Session ID to revoke
   * @param userId - User ID (for authorization)
   * @returns True if session was deleted
   * @throws Error if session not found or unauthorized
   */
  async revokeSession(sessionId: number, userId: number): Promise<void> {
    const success = await tokenService.revokeSession(sessionId, userId);

    if (!success) {
      throw new Error("Session not found or unauthorized");
    }
  }

  /**
   * Get current user info by ID
   * @param userId - User ID
   * @returns Safe user info (no password)
   * @throws Error if user not found
   */
  async getCurrentUser(userId: number) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return toSafeUser(user);
  }
}

// Export singleton instance
export default new AuthService();
