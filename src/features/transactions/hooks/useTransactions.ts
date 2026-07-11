import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../api/transactionsApi";

export const transactionsQueryKey = ["transactions"] as const;

export const useTransactions = () =>
  useQuery({
    queryFn: fetchTransactions,
    queryKey: transactionsQueryKey,
  });
