import { Link } from "react-router-dom";
import { useAuthStore } from "../../entities/auth";
import Card from "../../shared/components/Card";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const verifiedAt = user?.email_confirmed_at
    ? new Date(user.email_confirmed_at).toLocaleDateString()
    : "Pending verification";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-2xl items-center">
        <Card className="w-full p-8">
          <Link
            className="text-sm font-semibold text-green-700 hover:text-green-800"
            to="/"
          >
            Back to dashboard
          </Link>

          <h1 className="mt-6 text-3xl font-semibold text-slate-950">Profile</h1>
          <dl className="mt-8 grid gap-5">
            <div>
              <dt className="text-sm font-semibold text-slate-500">Email</dt>
              <dd className="mt-1 text-base text-slate-950">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500">
                Email verification
              </dt>
              <dd className="mt-1 text-base text-slate-950">{verifiedAt}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </main>
  );
}
