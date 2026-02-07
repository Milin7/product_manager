import { api } from "@/api/axios";
import {
  CreateTransactionParams,
  CreateTransactionSchema,
  TransactionSummaries,
} from "@/types/transaction.types";

export async function getTransactionsSummary(userId: number) {
  const response = await api.get(`transactions/${userId}`);
  const validatedData = TransactionSummaries.safeParse(response.data);

  if (validatedData.success) {
    return validatedData.data;
  } else {
    console.error(validatedData.error.issues);
    throw new Error("Failed to validate transaction data");
  }
}

export async function createTransaction(params: CreateTransactionParams) {
  const { userId, ...transactionData } = params;
  const response = await api.post(`transactions/${userId}`, transactionData);
  const validatedData = CreateTransactionSchema.safeParse(response.data);

  if (validatedData.success) {
    return validatedData.data;
  } else {
    console.error(validatedData.error.issues);
    throw new Error("Failed to validate created transaction data");
  }
}
