import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const marketingVariants = [
  {
    headline: "Calm control for every money decision.",
    subtitle:
      "Secure access to a clearer view of cash flow, savings, and portfolio health.",
    firstStatLabel: "Portfolio health",
    firstStatValue: "96%",
    secondStatLabel: "Monthly cash flow",
    secondStatValue: "+12.4%",
  },
  {
    headline: "See your spending before it surprises you.",
    subtitle:
      "Spot patterns early and keep everyday decisions aligned with your goals.",
    firstStatLabel: "Spend clarity",
    firstStatValue: "88%",
    secondStatLabel: "Budget drift",
    secondStatValue: "-18%",
  },
  {
    headline: "Build better financial habits every day.",
    subtitle:
      "Turn balances, bills, and goals into a calmer daily money routine.",
    firstStatLabel: "Habit streak",
    firstStatValue: "21d",
    secondStatLabel: "Goal progress",
    secondStatValue: "+34%",
  },
  {
    headline: "Know where your money goes.",
    subtitle:
      "Review categories, upcoming payments, and savings movement in one place.",
    firstStatLabel: "Tracked spend",
    firstStatValue: "100%",
    secondStatLabel: "Hidden fees",
    secondStatValue: "$0",
  },
  {
    headline: "Plan smarter. Spend calmer.",
    subtitle:
      "Make room for what matters with a cleaner view of cash flow timing.",
    firstStatLabel: "Bills forecast",
    firstStatValue: "30d",
    secondStatLabel: "Savings pace",
    secondStatValue: "+9.8%",
  },
];

const selectedMarketingVariant =
  marketingVariants[Math.floor(Math.random() * marketingVariants.length)];

export default function AuthLayout({ children }: AuthLayoutProps) {
  const marketing = selectedMarketingVariant;

  return (
    <main className="min-h-screen bg-white px-4 py-6 text-slate-950 sm:px-6 sm:py-8 lg:bg-slate-50 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center justify-center sm:min-h-[calc(100vh-4rem)]">
        <div className="grid w-full overflow-hidden bg-white lg:rounded-[32px] lg:border lg:border-slate-200 lg:shadow-2xl lg:shadow-slate-950/10 lg:grid-cols-[1fr_440px]">
          <section className="hidden min-h-[640px] bg-green-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-200">
                DRAM
              </p>
              <h2 className="mt-8 max-w-lg text-5xl font-semibold leading-tight tracking-normal">
                {marketing.headline}
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-green-50/80">
                {marketing.subtitle}
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-green-50/70">
                  {marketing.firstStatLabel}
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {marketing.firstStatValue}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-green-50/70">
                  {marketing.secondStatLabel}
                </p>
                <p className="mt-2 text-3xl font-semibold text-green-200">
                  {marketing.secondStatValue}
                </p>
              </div>
            </div>
          </section>

          <section className="flex min-h-[calc(100vh-3rem)] items-center justify-center bg-white px-1 py-4 sm:min-h-[620px] sm:px-8 lg:bg-white">
            <div className="w-full max-w-[420px]">{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
