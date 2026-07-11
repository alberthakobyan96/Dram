import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
  Trash2,
} from "lucide-react";
import type { Account } from "../../../entities/accounts";
import type { Category } from "../../../entities/categories";
import {
  formatTransactionAmount,
  formatTransactionDate,
  transactionTypeLabels,
  type Transaction,
} from "../../../entities/transactions";

type TransactionCardProps = {
  accounts: Account[];
  categories: Category[];
  onDelete: (transaction: Transaction) => void;
  transaction: Transaction;
};

const icons = {
  expense: ArrowUpRight,
  income: ArrowDownLeft,
  transfer: ArrowLeftRight,
};

export default function TransactionCard({
  accounts,
  categories,
  onDelete,
  transaction,
}: TransactionCardProps) {
  const Icon = icons[transaction.type];
  const account = accounts.find((item) => item.id === transaction.accountId);
  const destinationAccount = accounts.find(
    (item) => item.id === transaction.destinationAccountId,
  );
  const category = categories.find((item) => item.id === transaction.categoryId);
  const title =
    transaction.type === "transfer"
      ? `${account?.name ?? "Account"} to ${destinationAccount?.name ?? "Account"}`
      : (category?.name ?? transactionTypeLabels[transaction.type]);

  return (
    <li className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/[0.03]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
              transaction.type === "expense"
                ? "bg-slate-100 text-slate-600"
                : "bg-green-50 text-green-700"
            }`}
          >
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-slate-950">
              {title}
            </p>
            <p className="mt-0.5 truncate text-sm text-slate-500">
              {formatTransactionDate(transaction.occurredAt)}
              {transaction.note ? ` · ${transaction.note}` : ""}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <p
            className={`text-right text-base font-bold ${
              transaction.type === "expense"
                ? "text-slate-950"
                : "text-green-700"
            }`}
          >
            {formatTransactionAmount(
              transaction.amount,
              transaction.currency,
              transaction.type,
            )}
          </p>
          <button
            aria-label="Delete transaction"
            className="flex size-10 items-center justify-center rounded-2xl text-slate-400 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-600/10"
            onClick={() => onDelete(transaction)}
            type="button"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  );
}
