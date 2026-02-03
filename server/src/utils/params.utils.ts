import { Request } from "express";

export const parseIntParam = (
  param: string | string[] | undefined,
  paramName: string,
): number => {
  if (!param) {
    throw new Error(`Missing required parameter: ${paramName}`);
  }

  const value = Array.isArray(param) ? param[0] : param;

  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Invalid ${paramName}: must be a valid integer`);
  }
  return parsed;
};

export const parseCategoryParams = (req: Request) => {
  return {
    userId: parseIntParam(req.params.userId, "userId"),
    categoryId: parseIntParam(req.params.categoryId, "categoryId"),
  };
};

export const parseTransactionParams = (req: Request) => {
  return {
    userId: parseIntParam(req.params.userId, "userId"),
    transactionId: parseIntParam(req.params.transactionId, "transactionId"),
  };
};
