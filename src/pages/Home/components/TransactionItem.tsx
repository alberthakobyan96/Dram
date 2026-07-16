import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight } from "lucide-react";
import {
  formatDashboardAmount,
  type DashboardTransaction,
} from "../../../entities/dashboard";

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

const iconStyles = {
  expense: "bg-red-50 text-red-600",
  income: "bg-green-50 text-green-700",
  transfer: "bg-slate-100 text-slate-600",
};

const amountStyles = {
  expense: "text-red-600",
  income: "text-green-700",
  transfer: "text-slate-700",
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
    <li className="flex min-w-0 items-center gap-2.5 rounded-2xl px-1 py-2.5 transition-colors hover:bg-slate-50">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${iconStyles[transaction.type]}`}
      >
        <Icon className="size-4.5" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-950">
          {transaction.categoryName}
        </p>
        <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
          {accountLabel} · {formatDate(transaction.occurredAt)}
        </p>
      </div>

      <p
        className={`max-w-[44%] shrink-0 break-words text-right text-xs font-bold leading-5 tabular-nums sm:text-sm ${amountStyles[transaction.type]}`}
      >
        {amountPrefix}
        {formatDashboardAmount(transaction.amount, transaction.currency)}
      </p>
    </li>
  );
}
