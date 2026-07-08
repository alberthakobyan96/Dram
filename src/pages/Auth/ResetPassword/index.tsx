import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";
import AuthLayout from "../components/AuthLayout";
import { ResetPasswordForm } from "../components/Form";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Create new password"
        subtitle="Choose a secure password to restore access to your DRAM account."
      />

      <ResetPasswordForm />
      <AuthFooter />
    </AuthLayout>
  );
}
