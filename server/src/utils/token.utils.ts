import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import { JwtPayload } from "../dto/product/auth/JwtPayload.dto";

const NO_ACCESS_MSG =
  "JWT_ACCES_SECRET is not defined in environment variables";
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const ACCESS_EXPIRATION =
  (process.env.JWT_ACCESS_EXPIRATION as StringValue) || "15m";
const REFRESH_EXPIRATION =
  (process.env.JWT_REFRESH_EXPIRATION as StringValue) || "7d";

export const generateAccessToken = (userId: number, email: string): string => {
  if (!ACCESS_SECRET) {
    throw new Error(NO_ACCESS_MSG);
  }
  const payload: Omit<JwtPayload, "iat" | "exp"> = {
    userId,
    email,
  };

  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRATION,
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  if (!ACCESS_SECRET) {
    throw new Error(NO_ACCESS_MSG);
  }
  try {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }
    throw error;
  }
};

export const decodeToken = (token: string): JwtPayload | null => {
  return jwt.decode(token) as JwtPayload | null;
};

export const calculateTokenExpiration = (
  expiresIn: string = REFRESH_EXPIRATION,
): Date => {
  const now = new Date();
  const match = expiresIn.match(/^(\d+)([smhd])$/);

  if (!match) {
    throw new Error("Invalid expiration format");
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "s":
      return new Date(now.getTime() + value * 1000);
    case "m":
      return new Date(now.getTime() + value * 60 * 1000);
    case "h":
      return new Date(now.getTime() * 60 * 60 * 1000);
    case "d":
      return new Date(now.getTime() * 24 * 60 * 60 * 1000);
    default:
      throw new Error("Invalid time unit");
  }
};

export const extractBearerToken = (authHeader?: string): string | null => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
};
