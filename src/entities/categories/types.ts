export type CategoryType = "income" | "expense";

export type Category = {
  id: string;
  userId: string | null;
  name: string;
  type: CategoryType;
  icon: string;
  color: string | null;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateCategoryInput = {
  name: string;
  type: CategoryType;
  icon: string;
  color?: string | null;
};

export type UpdateCategoryInput = {
  name?: string;
  icon?: string;
  color?: string | null;
  isActive?: boolean;
};
