import {
  CreditCard,
  Landmark,
  MoreHorizontal,
  Pencil,
  Trash2,
  Wallet,
} from "lucide-react";
import {
  accountTypeLabels,
  formatAccountBalance,
  type Account,
} from "../../../entities/accounts";

type AccountCardProps = {
  account: Account;
  onDelete: (account: Account) => void;
  onEdit: (account: Account) => void;
  onToggleStatus: (account: Account) => void;
};

const typeIcons = {
  bank_account: Landmark,
  bank_card: CreditCard,
  cash: Wallet,
};

export default function AccountCard({
  account,
  onDelete,
  onEdit,
  onToggleStatus,
}: AccountCardProps) {
  const TypeIcon = typeIcons[account.type];

  return (
    <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/[0.04]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
            <TypeIcon className="size-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-slate-950">
              {account.name}
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {accountTypeLabels[account.type]} · {account.currency}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            account.isActive
              ? "bg-green-50 text-green-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {account.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-6 rounded-3xl bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
          Current balance
        </p>
        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {formatAccountBalance(account.currentBalance, account.currency)}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-600/10"
          onClick={() => onEdit(account)}
          type="button"
        >
          <Pencil className="size-4" aria-hidden="true" />
          Edit
        </button>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-600/10"
          onClick={() => onToggleStatus(account)}
          type="button"
        >
          <MoreHorizontal className="size-4" aria-hidden="true" />
          {account.isActive ? "Pause" : "Activate"}
        </button>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-600/10"
          onClick={() => onDelete(account)}
          type="button"
        >
          <Trash2 className="size-4" aria-hidden="true" />
          Delete
        </button>
      </div>
    </article>
  );
}
