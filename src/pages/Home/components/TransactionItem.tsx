import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight } from "lucide-react";
import {
  formatDashboardAmount,
  type DashboardTransaction,
} from "../../../entities/dashboard";
import { transactionTypeLabels } from "../../../entities/transactions";

type TransactionItemProps = {
  transaction: DashboardTransaction;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));

const icons = {
  expense: ArrowUpRight,
  income: ArrowDownLeft,
  transfer: ArrowLeftRight,
};

export default function TransactionItem({
  transaction,
}: TransactionItemProps) {
  const Icon = icons[transaction.type];
  const accountLabel =
    transaction.type === "transfer" && transaction.destinationAccountName
      ? `${transaction.accountName} to ${transaction.destinationAccountName}`
      : transaction.accountName;
  const amountPrefix =
    transaction.type === "income"
      ? "+"
      : transaction.type === "expense"
        ? "-"
        : "";

  return (
    <li className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3">
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
          transaction.type === "expense"
            ? "bg-slate-100 text-slate-600"
            : "bg-green-50 text-green-700"
        }`}
      >
        <Icon className="size-5" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-950">
          {accountLabel}
        </p>
        <p className="mt-1 truncate text-xs font-medium text-slate-500">
          {transactionTypeLabels[transaction.type]} · {transaction.categoryName}{" "}
          · {formatDate(transaction.occurredAt)}
        </p>
      </div>

      <p
        className={`max-w-[42%] shrink-0 text-right text-sm font-semibold ${
          transaction.type === "income"
            ? "text-green-700"
            : "text-slate-950"
        }`}
      >
        {amountPrefix}
        {formatDashboardAmount(transaction.amount, transaction.currency)}
      </p>
    </li>
  );
}
