import { Request, Response, NextFunction } from "express";
import { NotFoundError, ValidationError } from "../utils/errors";

//TODO: Review errorHandler to work correctly with different status.
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", error);

  if (error instanceof NotFoundError) {
    res.status(404).json({ error: error.message });
    return;
  }

  if (error instanceof ValidationError) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(500).json({ error: "Internal server error" });
};
