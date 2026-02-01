export interface JwtPayload {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}

export interface DeviceInfo {
  browser?: string;
  os?: string;
  ip?: string;
  userAgent?: string;
}

export interface RefreshTokenData {
  userId: number;
  tokenHash: string;
  deviceInfo: DeviceInfo;
  expiresAt: Date;
}

export interface UserSession {
  id: number;
  deviceInfo: DeviceInfo;
  createdAt: Date;
  lastUsedAt: Date;
  expiresAt: Date;
}
