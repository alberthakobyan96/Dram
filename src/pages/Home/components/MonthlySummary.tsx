import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { DashboardSummary } from "../../../entities/dashboard";

type MonthlySummaryProps = {
  summary: DashboardSummary;
};

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

export default function MonthlySummary({ summary }: MonthlySummaryProps) {
  const metrics = [
    {
      label: "Monthly income",
      value: formatCurrency(summary.monthlyIncome, summary.currency),
      icon: ArrowDownLeft,
      iconClassName: "bg-green-50 text-green-700",
    },
    {
      label: "Monthly expenses",
      value: formatCurrency(summary.monthlyExpenses, summary.currency),
      icon: ArrowUpRight,
      iconClassName: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/[0.04]"
          >
            <div
              className={`flex size-11 items-center justify-center rounded-2xl ${metric.iconClassName}`}
            >
              <Icon className="size-5" aria-hidden="true" />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {metric.value}
            </p>
          </div>
        );
      })}
    </section>
  );
}
