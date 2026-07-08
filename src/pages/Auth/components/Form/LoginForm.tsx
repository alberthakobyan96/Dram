import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  setRememberSession,
  supabase,
  supabaseConfigError,
} from "../../../../shared/api/supabase";
import Button from "../../../../shared/components/Button";
import Card from "../../../../shared/components/Card";
import Input from "../../../../shared/components/Input";
import Label from "../../../../shared/components/Label";
import PasswordInput from "../../../../shared/components/PasswordInput";
import SocialButtons from "../SocialButtons";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
  remember: z.boolean(),
});

type LoginValues = z.infer<typeof loginSchema>;
type LocationState = {
  from?: {
    pathname?: string;
  };
};

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setFormError("");
    setRememberSession(values.remember);

    if (!supabase) {
      setFormError(supabaseConfigError);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setFormError(error.message);
      return;
    }

    navigate(locationState?.from?.pathname ?? "/", { replace: true });
  };

  return (
    <Card className="p-5 sm:p-6">
      <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            hasError={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? (
            <p className="mt-2 text-sm font-medium text-red-600">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="login-password">Password</Label>
          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            placeholder="Enter your password"
            hasError={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password ? (
            <p className="mt-2 text-sm font-medium text-red-600">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
            <input
              type="checkbox"
              className="size-4 rounded border-slate-300 text-green-600 focus:ring-4 focus:ring-green-600/10"
              {...register("remember")}
            />
            Remember me
          </label>

          <Link
            className="text-sm font-semibold text-green-700 hover:text-green-800"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>

        {formError ? (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700">
            {formError}
          </p>
        ) : null}

        <Button type="submit" isLoading={isSubmitting}>
          Sign in
        </Button>
      </form>

      <SocialButtons />

      <p className="mt-6 text-center text-sm leading-6 text-slate-500">
        New to DRAM?{" "}
        <Link
          className="font-semibold text-green-700 hover:text-green-800"
          to="/register"
        >
          Create an account
        </Link>
      </p>
    </Card>
  );
}
