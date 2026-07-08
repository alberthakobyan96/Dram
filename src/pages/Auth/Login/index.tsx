import AuthLayout from "../components/AuthLayout";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import { LoginForm } from "../components/Form";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome back"
        subtitle="Sign in to your DRAM account"
      />

      <LoginForm />
      <AuthFooter />
    </AuthLayout>
  );
}
