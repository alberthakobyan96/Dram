import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function EmptyState({
  icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center">
      <div className="mx-auto flex size-10 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
        {icon}
      </div>
      <h3 className="mt-3 text-sm font-semibold text-slate-950">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-xs text-sm leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}
