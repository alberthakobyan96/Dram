import type {
  Category,
  CategoryType,
} from "../../../entities/categories";
import { supabase, supabaseConfigError } from "../../../shared/api/supabase";

type CategoryRow = {
  id: string;
  user_id: string | null;
  name: string;
  type: CategoryType;
  icon: string;
  color: string | null;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

const requireSupabase = () => {
  if (!supabase) {
    throw new Error(supabaseConfigError);
  }

  return supabase;
};

const mapCategory = (row: CategoryRow): Category => ({
  color: row.color,
  createdAt: row.created_at,
  icon: row.icon,
  id: row.id,
  isActive: row.is_active,
  isDefault: row.is_default,
  name: row.name,
  type: row.type,
  updatedAt: row.updated_at,
  userId: row.user_id,
});

export const fetchCategories = async (): Promise<Category[]> => {
  const client = requireSupabase();
  const { data, error } = await client
    .from("categories")
    .select(
      "id,user_id,name,type,icon,color,is_default,is_active,created_at,updated_at",
    )
    .eq("is_active", true)
    .order("is_default", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as CategoryRow[]).map(mapCategory);
};
