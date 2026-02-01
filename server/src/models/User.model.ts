export interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface SafeUser {
  id: number;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export const toSafeUser = (user: User): SafeUser => {
  const { password_hash, ...safeUser } = user;
  return safeUser;
};
