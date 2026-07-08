import { useState, type InputHTMLAttributes } from "react";
import Input from "../Input";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export default function PasswordInput({
  className = "",
  hasError = false,
  ...props
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        className={`pr-20 ${className}`}
        hasError={hasError}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 rounded-xl px-2 py-1 -translate-y-1/2 text-sm font-semibold text-slate-500 outline-none transition hover:text-slate-900 focus-visible:ring-4 focus-visible:ring-green-600/10"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
