import type {
  Account,
  AccountCurrency,
  AccountType,
  CreateAccountInput,
  UpdateAccountInput,
} from "../../../entities/accounts";
import { supabase, supabaseConfigError } from "../../../shared/api/supabase";

type AccountRow = {
  id: string;
  user_id: string;
  name: string;
  type: AccountType;
  currency: AccountCurrency;
  current_balance: number | string;
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

const mapAccount = (row: AccountRow): Account => ({
  id: row.id,
  userId: row.user_id,
  name: row.name,
  type: row.type,
  currency: row.currency,
  currentBalance: Number(row.current_balance),
  isActive: row.is_active,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const fetchAccounts = async (): Promise<Account[]> => {
  const client = requireSupabase();
  const { data, error } = await client
    .from("accounts")
    .select(
      "id,user_id,name,type,currency,current_balance,is_active,created_at,updated_at",
    )
    .order("is_active", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as AccountRow[]).map(mapAccount);
};

export const createAccount = async (
  input: CreateAccountInput,
): Promise<Account> => {
  const client = requireSupabase();
  const { data, error } = await client.rpc("create_account", {
    p_currency: input.currency,
    p_initial_balance: input.initialBalance,
    p_name: input.name,
    p_type: input.type,
  });

  if (error) {
    throw new Error(error.message);
  }

  return mapAccount(data as AccountRow);
};

export const updateAccount = async (
  input: UpdateAccountInput,
): Promise<Account> => {
  const client = requireSupabase();
  const { id, ...values } = input;
  const updateValues = {
    currency: values.currency,
    is_active: values.isActive,
    name: values.name,
    type: values.type,
  };

  const { data, error } = await client
    .from("accounts")
    .update(updateValues)
    .eq("id", id)
    .select(
      "id,user_id,name,type,currency,current_balance,is_active,created_at,updated_at",
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapAccount(data as AccountRow);
};

export const deleteAccount = async (accountId: string): Promise<void> => {
  const client = requireSupabase();
  const { error } = await client.from("accounts").delete().eq("id", accountId);

  if (error) {
    throw new Error(error.message);
  }
};
