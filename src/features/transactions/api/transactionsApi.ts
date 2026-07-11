import type {
  AccountCurrency,
} from "../../../entities/accounts";
import type {
  CreateTransactionInput,
  Transaction,
  TransactionType,
} from "../../../entities/transactions";
import { supabase, supabaseConfigError } from "../../../shared/api/supabase";

type TransactionRow = {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number | string;
  currency: AccountCurrency;
  category_id: string | null;
  account_id: string;
  destination_account_id: string | null;
  occurred_at: string;
  note: string | null;
  created_at: string;
  updated_at: string;
};

const requireSupabase = () => {
  if (!supabase) {
    throw new Error(supabaseConfigError);
  }

  return supabase;
};

const mapTransaction = (row: TransactionRow): Transaction => {
  const base = {
    accountId: row.account_id,
    amount: Number(row.amount),
    createdAt: row.created_at,
    currency: row.currency,
    id: row.id,
    note: row.note,
    occurredAt: row.occurred_at,
    updatedAt: row.updated_at,
    userId: row.user_id,
  };

  if (row.type === "transfer") {
    return {
      ...base,
      categoryId: null,
      destinationAccountId: row.destination_account_id ?? "",
      type: "transfer",
    };
  }

  return {
    ...base,
    categoryId: row.category_id ?? "",
    destinationAccountId: null,
    type: row.type,
  };
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const client = requireSupabase();
  const { data, error } = await client
    .from("transactions")
    .select(
      "id,user_id,type,amount,currency,category_id,account_id,destination_account_id,occurred_at,note,created_at,updated_at",
    )
    .order("occurred_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as TransactionRow[]).map(mapTransaction);
};

export const createTransaction = async (
  input: CreateTransactionInput,
): Promise<Transaction> => {
  const client = requireSupabase();
  const { data, error } = await client.rpc("create_transaction", {
    p_account_id: input.accountId,
    p_amount: input.amount,
    p_category_id: input.type === "transfer" ? null : input.categoryId,
    p_currency: input.currency,
    p_destination_account_id:
      input.type === "transfer" ? input.destinationAccountId : null,
    p_note: input.note ?? null,
    p_occurred_at: input.occurredAt,
    p_type: input.type,
  });

  if (error) {
    throw new Error(error.message);
  }

  return mapTransaction(data as TransactionRow);
};

export const deleteTransaction = async (
  transactionId: string,
): Promise<Transaction> => {
  const client = requireSupabase();
  const { data, error } = await client.rpc("delete_transaction", {
    p_transaction_id: transactionId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return mapTransaction(data as TransactionRow);
};
