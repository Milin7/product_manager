export interface SessionInfoDto {
  id: number;
  deviceInfo: {
    browser?: string;
    os?: string;
    ip?: string;
  };
  createdAt: Date;
  lastUsedAt: Date;
  expiresAt: Date;
  isCurrent: boolean;
}
