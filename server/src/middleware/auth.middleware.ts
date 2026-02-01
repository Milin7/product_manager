import { Request, Response, NextFunction } from "express";
import { extractBearerToken } from "../utils/token.utils";
import tokenService from "../services/Token.service";

/**
 * Authentication Middleware
 * Protects routes by verifying JWT access tokens
 *
 * Usage:
 * router.get('/protected', authenticateToken, controller.method);
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractBearerToken(authHeader);

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access token is required",
      });
      return;
    }

    const decoded = tokenService.verifyAccessToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({
        success: false,
        message: error.message || "Invalid or expired token",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};

/**
 * Optional Authentication Middleware
 * Attaches user info if token is valid, but doesn't block request if missing
 *
 * Usage:
 * router.get('/maybe-protected', optionalAuth, controller.method);
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractBearerToken(authHeader);

    if (token) {
      const decoded = tokenService.verifyAccessToken(token);
      req.user = decoded;
    }

    next();
  } catch (error) {
    next();
  }
};
