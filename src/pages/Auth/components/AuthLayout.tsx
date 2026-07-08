import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
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
                Calm control for every money decision.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-green-50/80">
                Secure access to a clearer view of cash flow, savings, and
                portfolio health.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-green-50/70">Portfolio health</p>
                <p className="mt-2 text-3xl font-semibold">96%</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-green-50/70">Monthly cash flow</p>
                <p className="mt-2 text-3xl font-semibold text-green-200">
                  +12.4%
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
