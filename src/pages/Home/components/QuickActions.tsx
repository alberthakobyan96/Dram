import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  {
    label: "Income",
    icon: ArrowDownLeft,
    to: "/transactions/new?type=income",
  },
  {
    label: "Expense",
    icon: ArrowUpRight,
    to: "/transactions/new?type=expense",
  },
  {
    label: "Transfer",
    icon: ArrowLeftRight,
    to: "/transactions/new?type=transfer",
  },
  {
    label: "Accounts",
    icon: WalletCards,
    to: "/accounts",
  },
];

export default function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-title" className="min-w-0">
      <h2
        className="mb-2 text-[17px] font-semibold text-slate-950"
        id="quick-actions-title"
      >
        Quick actions
      </h2>

      <div className="grid min-w-0 grid-cols-4 gap-2 sm:gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              className="flex min-h-20 min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-1.5 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm outline-none transition hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus-visible:ring-4 focus-visible:ring-green-600/15 sm:min-h-24 sm:gap-2.5 sm:text-sm"
              key={action.label}
              to={action.to}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="w-full truncate">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
