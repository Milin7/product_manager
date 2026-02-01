import crypto from "crypto";
import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateRandomToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString("hex");
};

export const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const generateSessionId = (): string => {
  return crypto.randomBytes(16).toString("hex");
};
