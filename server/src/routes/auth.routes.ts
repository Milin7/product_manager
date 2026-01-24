import { Router } from "express";
import authController from "../controllers/Auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  registerSchema,
  loginSchema,
  sessionIdSchema,
} from "../validators/auth.validator";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", validate(registerSchema), authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return tokens
 * @access  Public
 */
router.post("/login", validate(loginSchema), authController.login);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token using refresh token from cookie
 * @access  Public (but requires valid refresh token in cookie)
 */
router.post("/refresh", authController.refreshToken);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout current session (revoke refresh token)
 * @access  Public (but requires refresh token in cookie)
 */
router.post("/logout", authController.logout);

/**
 * @route   POST /api/auth/logout-all
 * @desc    Logout all sessions for current user
 * @access  Private (requires authentication)
 */
router.post("/logout-all", authenticateToken, authController.logoutAll);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user info
 * @access  Private (requires authentication)
 */
router.get("/me", authenticateToken, authController.getCurrentUser);

/**
 * @route   GET /api/auth/sessions
 * @desc    Get all active sessions for current user
 * @access  Private (requires authentication)
 */
router.get("/sessions", authenticateToken, authController.getSessions);

/**
 * @route   DELETE /api/auth/sessions/:sessionId
 * @desc    Revoke specific session by ID
 * @access  Private (requires authentication)
 */
router.delete(
  "/sessions/:sessionId",
  authenticateToken,
  validate(sessionIdSchema),
  authController.revokeSession,
);

export default router;
