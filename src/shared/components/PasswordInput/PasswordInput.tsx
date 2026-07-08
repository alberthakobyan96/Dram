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
        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
