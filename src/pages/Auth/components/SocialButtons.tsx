import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  setRememberSession,
  supabase,
  supabaseConfigError,
} from "../../../shared/api/supabase";
import Button from "../../../shared/components/Button";
import Divider from "../../../shared/components/Divider";

export default function SocialButtons() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setRememberSession(true);

    if (!supabase) {
      setErrorMessage(supabaseConfigError);
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Divider />
      <Button
        type="button"
        variant="secondary"
        isLoading={isLoading}
        onClick={signInWithGoogle}
      >
        <ShieldCheck className="size-5 text-green-700" aria-hidden="true" />
        Continue with Google
      </Button>
      {errorMessage ? (
        <p className="mt-3 text-center text-sm font-medium text-red-600">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
