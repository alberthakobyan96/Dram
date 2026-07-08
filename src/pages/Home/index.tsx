import { Link } from "react-router-dom";
import { useAuthStore } from "../../entities/auth";
import { supabase } from "../../shared/api/supabase";
import Button from "../../shared/components/Button";
import Card from "../../shared/components/Card";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const displayName =
    typeof user?.user_metadata.full_name === "string"
      ? user.user_metadata.full_name
      : user?.email;

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl items-center">
        <Card className="w-full p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
                DRAM
              </p>
              <h1 className="mt-4 text-3xl font-semibold text-slate-950">
                Welcome{displayName ? `, ${displayName}` : ""}
              </h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">
                Your secure financial workspace is ready.
              </p>
            </div>

            <Link
              className="inline-flex rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              to="/profile"
            >
              Profile
            </Link>
          </div>

          <div className="mt-8 max-w-xs">
            <Button type="button" variant="secondary" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
