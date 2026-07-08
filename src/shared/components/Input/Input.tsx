import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", hasError = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`w-full rounded-2xl border bg-white px-4 py-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 ${
          hasError ? "border-red-400" : "border-slate-200"
        } ${className}`}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
