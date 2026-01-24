import { DeviceInfo } from "../dto/product/auth/JwtPayload.dto";

export interface RefreshToken {
  id: number;
  user_id: number;
  token_hash: string;
  device_info: DeviceInfo;
  expires_at: Date;
  created_at: Date;
  last_used_at: Date;
}

export interface RefreshTokenWithUser extends RefreshToken {
  user: {
    id: number;
    email: string;
  };
}

export interface CreateRefreshTokenInput {
  user_id: number;
  token_hash: string;
  device_info: DeviceInfo;
  expires_at: Date;
}
