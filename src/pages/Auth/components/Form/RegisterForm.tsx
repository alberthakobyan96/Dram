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
import PasswordInput from "../../../../shared/components/PasswordInput";
import SocialButtons from "../SocialButtons";

const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name."),
    email: z.string().trim().email("Enter a valid email address."),
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterValues) => {
    setFormError("");
    setSuccessMessage("");

    if (!supabase) {
      setFormError(supabaseConfigError);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      setFormError(error.message);
      return;
    }

    setSuccessMessage("Check your email to verify your DRAM account.");
  };

  return (
    <Card>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="Alex Morgan"
            hasError={Boolean(errors.fullName)}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
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

        <div>
          <Label htmlFor="register-password">Password</Label>
          <PasswordInput
            id="register-password"
            autoComplete="new-password"
            placeholder="Create a secure password"
            hasError={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password ? (
            <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirm password</Label>
          <PasswordInput
            id="confirm-password"
            autoComplete="new-password"
            placeholder="Repeat your password"
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
          Create account
        </Button>
      </form>

      <SocialButtons />

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link className="font-semibold text-green-700 hover:text-green-800" to="/login">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
