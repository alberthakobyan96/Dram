import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-green-600 text-white shadow-sm shadow-green-600/20 hover:bg-green-700",
  secondary:
    "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50",
  ghost: "border-transparent bg-transparent text-slate-700 hover:bg-slate-100",
};

export default function Button({
  children,
  type = "button",
  disabled = false,
  isLoading = false,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-5 py-4 text-base font-semibold transition duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}
