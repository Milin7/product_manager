import { Request, Response } from "express";
import authService from "../services/Auth.service";
import { extractDeviceInfo } from "../utils/device.utils";
import { error } from "node:console";

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const deviceInfo = extractDeviceInfo(req);

      const { authResponse, refreshToken } = await authService.register(
        email,
        password,
        deviceInfo,
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/auth",
      });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: authResponse,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const deviceInfo = extractDeviceInfo(req);

      // Call auth service
      const { authResponse, refreshToken } = await authService.login(
        email,
        password,
        deviceInfo,
      );

      // Set refresh token in HttpOnly cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/api/auth",
      });

      // Send access token in response body
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: authResponse,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          message: "Refresh token is required",
        });
        return;
      }

      // Get new access token
      const newAccessToken = await authService.refreshAccessToken(refreshToken);

      res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        data: {
          accessToken: newAccessToken,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          message: "No active session found",
        });
        return;
      }

      await authService.logout(refreshToken);

      res.clearCookie("refreshToken", { path: "/api/auth" });

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async logoutAll(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      await authService.logoutAll(userId);

      res.clearCookie("refreshToken", { path: "/api/auth" });

      res.status(200).json({
        success: true,
        message: "Logged out from all devices",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const user = await authService.getCurrentUser(userId);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * Get all active sessions
   * GET /api/auth/sessions
   * Requires authentication
   */
  async getSessions(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const currentRefreshToken = req.cookies.refreshToken;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const sessions = await authService.getUserSessions(
        userId,
        currentRefreshToken,
      );

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  /**
   * Revoke specific session
   * DELETE /api/auth/sessions/:sessionId
   * Requires authentication
   */
  async revokeSession(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const sessionId = parseInt(req.params.sessionId as string);

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      await authService.revokeSession(sessionId, userId);

      res.status(200).json({
        success: true,
        message: "Session revoked successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export default new AuthController();
