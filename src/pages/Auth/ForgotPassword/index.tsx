import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";
import AuthLayout from "../components/AuthLayout";
import { ForgotPasswordForm } from "../components/Form";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Reset password"
        subtitle="Enter your email and we will send secure recovery instructions."
      />

      <ForgotPasswordForm />
      <AuthFooter />
    </AuthLayout>
  );
}
