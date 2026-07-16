import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../entities/auth";
import {
  fetchCategories,
  type FetchCategoriesOptions,
} from "../api/categoriesApi";

export const categoriesQueryKey = ["categories"] as const;

export const useCategories = (options: FetchCategoriesOptions = {}) => {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    enabled: Boolean(userId),
    queryFn: () => fetchCategories(options),
    queryKey: [
      ...categoriesQueryKey,
      userId ?? "signed-out",
      { includeInactive: options.includeInactive ?? false },
    ],
  });
};
