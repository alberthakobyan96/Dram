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
import Label from "../../../../shared/components/Label";
import PasswordInput from "../../../../shared/components/PasswordInput";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    setFormError("");
    setSuccessMessage("");

    if (!supabase) {
      setFormError(supabaseConfigError);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      setFormError(error.message);
      return;
    }

    setSuccessMessage("Your password has been updated.");
  };

  return (
    <Card>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="reset-password">New password</Label>
          <PasswordInput
            id="reset-password"
            autoComplete="new-password"
            placeholder="Create a new password"
            hasError={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password ? (
            <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="reset-confirm-password">Confirm password</Label>
          <PasswordInput
            id="reset-confirm-password"
            autoComplete="new-password"
            placeholder="Repeat your new password"
            hasError={Boolean(errors.confirmPassword)}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <p className="mt-2 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
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
          Update password
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Return to{" "}
        <Link className="font-semibold text-green-700 hover:text-green-800" to="/login">
          sign in
        </Link>
      </p>
    </Card>
  );
}
