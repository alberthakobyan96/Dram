import { useQuery } from "@tanstack/react-query";
import { fetchAccounts } from "../api/accountsApi";

export const accountsQueryKey = ["accounts"] as const;

export const useAccounts = () =>
  useQuery({
    queryFn: fetchAccounts,
    queryKey: accountsQueryKey,
  });
