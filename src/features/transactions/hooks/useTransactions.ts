import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../entities/auth";
import {
  defaultTransactionLimit,
  fetchTransactions,
  type FetchTransactionsOptions,
} from "../api/transactionsApi";

export const transactionsQueryKey = ["transactions"] as const;

const getTransactionsQueryKey = (
  userId: string | undefined,
  options: FetchTransactionsOptions,
) =>
  [
    ...transactionsQueryKey,
    userId ?? "signed-out",
    {
      fetchAll: options.fetchAll ?? false,
      limit: options.fetchAll
        ? null
        : (options.limit ?? defaultTransactionLimit),
      occurredBefore: options.occurredBefore ?? null,
      occurredFrom: options.occurredFrom ?? null,
    },
  ] as const;

export const useTransactions = (options: FetchTransactionsOptions = {}) => {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    enabled: Boolean(userId),
    queryFn: () => fetchTransactions(options),
    queryKey: getTransactionsQueryKey(userId, options),
  });
};
