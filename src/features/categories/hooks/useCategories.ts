import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/categoriesApi";

export const categoriesQueryKey = ["categories"] as const;

export const useCategories = () =>
  useQuery({
    queryFn: fetchCategories,
    queryKey: categoriesQueryKey,
  });
