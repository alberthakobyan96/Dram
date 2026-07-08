import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";
import AuthLayout from "../components/AuthLayout";
import { RegisterForm } from "../components/Form";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Create your account"
        subtitle="Start building a clearer financial picture with secure access."
      />

      <RegisterForm />
      <AuthFooter />
    </AuthLayout>
  );
}
