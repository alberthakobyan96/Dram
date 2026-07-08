import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/[0.04] sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
