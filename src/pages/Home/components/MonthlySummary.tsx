import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import {
  formatDashboardAmount,
  type DashboardSummary,
} from "../../../entities/dashboard";

type MonthlySummaryProps = {
  errorMessage: string | null;
  isLoading: boolean;
  onRetry: () => void;
  summary: DashboardSummary;
};

export default function MonthlySummary({
  errorMessage,
  isLoading,
  onRetry,
  summary,
}: MonthlySummaryProps) {
  if (isLoading) {
    return (
      <section
        className="grid grid-cols-2 gap-2.5 sm:gap-3"
        aria-label="Loading monthly totals"
      >
        {[0, 1].map((item) => (
          <div
            className="h-32 animate-pulse rounded-3xl border border-slate-200/80 bg-white shadow-sm shadow-slate-950/[0.03]"
            key={item}
          />
        ))}
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="rounded-3xl border border-red-100 bg-red-50 p-4 shadow-sm shadow-slate-950/[0.03]">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-red-800">
              Monthly totals unavailable
            </h2>
            <p className="mt-1 break-words text-sm leading-5 text-red-700">
              {errorMessage}
            </p>
          </div>
          <button
            className="min-h-11 shrink-0 rounded-2xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 outline-none transition hover:bg-red-100 focus-visible:ring-4 focus-visible:ring-red-600/15"
            onClick={onRetry}
            type="button"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const metrics = [
    {
      emptyLabel: "No income",
      icon: ArrowDownLeft,
      iconClassName: "bg-green-50 text-green-700",
      label: "Income",
      values: summary.monthlyIncome,
    },
    {
      emptyLabel: "No expenses",
      icon: ArrowUpRight,
      iconClassName: "bg-red-50 text-red-600",
      label: "Expenses",
      values: summary.monthlyExpenses,
    },
  ];

  return (
    <section className="grid min-w-0 grid-cols-2 gap-2.5 sm:gap-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const hasMultipleCurrencies = metric.values.length > 1;

        return (
          <article
            key={metric.label}
            className="min-w-0 rounded-3xl border border-slate-200/80 bg-white p-3.5 shadow-sm shadow-slate-950/[0.03] sm:p-5"
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-2xl ${metric.iconClassName}`}
              >
                <Icon className="size-4.5" aria-hidden="true" />
              </div>
              <p className="truncate text-[13px] font-semibold text-slate-500 sm:text-sm">
                {metric.label}
              </p>
            </div>

            {metric.values.length > 0 ? (
              <div className="mt-3 grid min-w-0 gap-1">
                {metric.values.map(({ amount, currency }) => (
                  <p
                    className={`max-w-full break-words font-bold leading-tight tracking-normal text-slate-950 tabular-nums ${
                      hasMultipleCurrencies
                        ? "text-[15px] sm:text-lg"
                        : "text-lg sm:text-2xl"
                    }`}
                    key={currency}
                  >
                    {formatDashboardAmount(amount, currency)}
                  </p>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm font-semibold text-slate-700">
                {metric.emptyLabel}
              </p>
            )}

            <p className="mt-2 text-xs font-medium text-slate-400">
              Current month
            </p>
          </article>
        );
      })}
    </section>
  );
}
