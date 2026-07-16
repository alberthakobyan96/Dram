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
      <section className="grid gap-3 sm:grid-cols-2" aria-label="Loading monthly totals">
        {[0, 1].map((item) => (
          <div
            className="h-[92px] animate-pulse rounded-[24px] border border-slate-200 bg-white shadow-lg shadow-slate-950/[0.03] sm:rounded-[28px]"
            key={item}
          />
        ))}
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="rounded-[24px] border border-red-100 bg-red-50 p-4 shadow-lg shadow-slate-950/[0.03] sm:rounded-[28px] sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-red-800">
              Monthly totals unavailable
            </h2>
            <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
          </div>
          <button
            className="shrink-0 rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 outline-none transition hover:bg-red-100 focus-visible:ring-4 focus-visible:ring-red-600/10"
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
      emptyLabel: "No income this month",
      icon: ArrowDownLeft,
      iconClassName: "bg-green-50 text-green-700",
      label: "Monthly income",
      values: summary.monthlyIncome,
    },
    {
      emptyLabel: "No expenses this month",
      icon: ArrowUpRight,
      iconClassName: "bg-slate-100 text-slate-600",
      label: "Monthly expenses",
      values: summary.monthlyExpenses,
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/[0.03] sm:rounded-[28px] sm:p-5"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-2xl sm:size-11 ${metric.iconClassName}`}
              >
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {metric.label}
                </p>
                {metric.values.length > 0 ? (
                  <div className="mt-1 grid gap-0.5">
                    {metric.values.map(({ amount, currency }) => (
                      <p
                        className="text-xl font-semibold text-slate-950 sm:text-2xl"
                        key={currency}
                      >
                        {formatDashboardAmount(amount, currency)}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {metric.emptyLabel}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
