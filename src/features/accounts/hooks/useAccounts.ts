import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../entities/auth";
import { fetchAccounts } from "../api/accountsApi";

export const accountsQueryKey = ["accounts"] as const;

export const useAccounts = () => {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    enabled: Boolean(userId),
    queryFn: fetchAccounts,
    queryKey: [...accountsQueryKey, userId ?? "signed-out"],
  });
};
