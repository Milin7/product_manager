import { Request, Response, NextFunction } from "express";
import { TransactionService } from "../services/Transaction.service";
import { parseTransactionParams } from "../utils/params.utils";
import { CreateTransactionDto } from "../dto/transaction/CreateTransaction.dto";

export class TransactionController {
  static async getAllTransactionsById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = parseInt(req.params.userId as string);
      const response = await TransactionService.getAllTransactionsById(userId);
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const params = parseTransactionParams(req);
      const response = await TransactionService.getTransactionById(params);
      return res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async createTransaction(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = parseInt(req.params.userId as string);
      const createTransactionDto: CreateTransactionDto = req.body;
      const response = await TransactionService.createTransaction(
        userId,
        createTransactionDto,
      );
      return res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
