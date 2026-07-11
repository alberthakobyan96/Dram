import { ArrowDownLeft, ArrowUpRight, Plus, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  {
    label: "Add income",
    icon: ArrowDownLeft,
    to: "/transactions/new?type=income",
  },
  {
    label: "Add expense",
    icon: ArrowUpRight,
    to: "/transactions/new?type=expense",
  },
  {
    label: "Transfer",
    icon: Plus,
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
    <section className="rounded-[26px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/[0.03] sm:rounded-[28px] sm:p-6">
      <div className="mb-3 sm:mb-5">
        <h2 className="text-lg font-semibold text-slate-950">Quick actions</h2>
        <p className="mt-0.5 text-sm text-slate-500 sm:mt-1">
          Common money tasks
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return action.to ? (
            <Link
              className="flex min-h-[70px] items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700 outline-none transition hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus-visible:ring-4 focus-visible:ring-green-600/10 sm:min-h-24 sm:flex-col sm:gap-3 sm:rounded-3xl sm:py-4"
              key={action.label}
              to={action.to}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm sm:size-11">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              {action.label}
            </Link>
          ) : (
            <button
              key={action.label}
              type="button"
              className="flex min-h-[70px] items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700 outline-none transition hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus-visible:ring-4 focus-visible:ring-green-600/10 sm:min-h-24 sm:flex-col sm:gap-3 sm:rounded-3xl sm:py-4"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm sm:size-11">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              {action.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
