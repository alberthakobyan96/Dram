import type { LabelHTMLAttributes, ReactNode } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export default function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label
      className={`mb-2 block text-sm font-semibold text-slate-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
