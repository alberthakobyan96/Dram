import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTransactionInput } from "../../../entities/transactions";
import { accountsQueryKey } from "../../accounts/hooks/useAccounts";
import {
  createTransaction,
  deleteTransaction,
} from "../api/transactionsApi";
import { transactionsQueryKey } from "./useTransactions";

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTransactionInput) => createTransaction(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: transactionsQueryKey });
      void queryClient.invalidateQueries({ queryKey: accountsQueryKey });
    },
  });
};

export const useDeleteTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transactionId: string) => deleteTransaction(transactionId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: transactionsQueryKey });
      void queryClient.invalidateQueries({ queryKey: accountsQueryKey });
    },
  });
};
