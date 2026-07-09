import { ArrowDownLeft, ArrowUpRight, BarChart3, Plus } from "lucide-react";

const quickActions = [
  {
    label: "Add income",
    icon: ArrowDownLeft,
  },
  {
    label: "Add expense",
    icon: ArrowUpRight,
  },
  {
    label: "Transfer",
    icon: Plus,
  },
  {
    label: "Insights",
    icon: BarChart3,
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/[0.04] sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">Quick actions</h2>
        <p className="mt-1 text-sm text-slate-500">Common money tasks</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-3 py-4 text-sm font-semibold text-slate-700 outline-none transition hover:border-green-200 hover:bg-green-50 hover:text-green-800 focus-visible:ring-4 focus-visible:ring-green-600/10"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
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
