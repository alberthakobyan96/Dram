import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-[1fr_440px]">
          <section className="hidden min-h-[620px] bg-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-green-300">
                DRAM
              </p>
              <h2 className="mt-8 max-w-lg text-5xl font-semibold leading-tight">
                Calm control for every money decision.
              </h2>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Portfolio health</p>
                <p className="mt-2 text-3xl font-semibold">96%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Monthly cash flow</p>
                <p className="mt-2 text-3xl font-semibold text-green-300">+12.4%</p>
              </div>
            </div>
          </section>

          <section className="flex min-h-[620px] items-center justify-center bg-slate-50 px-5 py-8 sm:px-8">
            <div className="w-full max-w-[420px]">{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
