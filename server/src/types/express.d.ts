import { JwtPayload } from "../dto/product/auth/JwtPayload.dto";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
