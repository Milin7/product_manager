import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import {
  transactionAndUserSchema,
  transactionUserIdSchema,
} from "../validators/transaction.validator";
import { TransactionController } from "../controllers/Transaction.controller";

const router = Router();

router.get(
  "/:userId",
  validate(transactionUserIdSchema),
  TransactionController.getAllTransactionsById,
);

router.get(
  "/:userId/:transactionId",
  validate(transactionAndUserSchema),
  TransactionController.getTransactionById,
);

export default router;
