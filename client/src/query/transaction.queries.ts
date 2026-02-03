import {
  createTransaction,
  getTransactionsSummary,
} from "@/services/transaction.service";
import { CreateTransactionParams } from "@/types/transaction.types";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const transactionQueries = {
  key: (userId: number) => ["transactions", userId],
  summary: (userId: number) =>
    queryOptions({
      queryKey: transactionQueries.key(userId),
      queryFn: () => getTransactionsSummary(userId),
    }),
  create: () =>
    mutationOptions({
      mutationFn: (params: CreateTransactionParams) =>
        createTransaction(params),
    }),
};
