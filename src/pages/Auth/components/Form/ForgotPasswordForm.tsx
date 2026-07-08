import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  supabase,
  supabaseConfigError,
} from "../../../../shared/api/supabase";
import Button from "../../../../shared/components/Button";
import Card from "../../../../shared/components/Card";
import Input from "../../../../shared/components/Input";
import Label from "../../../../shared/components/Label";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setFormError("");
    setSuccessMessage("");

    if (!supabase) {
      setFormError(supabaseConfigError);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) {
      setFormError(error.message);
      return;
    }

    setSuccessMessage("Password reset instructions have been sent.");
  };

  return (
    <Card>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="reset-email">Email</Label>
          <Input
            id="reset-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            hasError={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          ) : null}
        </div>

        {formError ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {formError}
          </p>
        ) : null}

        {successMessage ? (
          <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {successMessage}
          </p>
        ) : null}

        <Button type="submit" isLoading={isSubmitting}>
          Send reset link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Remembered your password?{" "}
        <Link className="font-semibold text-green-700 hover:text-green-800" to="/login">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
