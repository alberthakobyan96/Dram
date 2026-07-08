import { useEffect, type ReactNode } from "react";
import { supabase } from "../../../shared/api/supabase";
import { useAuthStore } from "../../../entities/auth";

type AuthSessionProviderProps = {
  children: ReactNode;
};

export default function AuthSessionProvider({
  children,
}: AuthSessionProviderProps) {
  const setSession = useAuthStore((state) => state.setSession);
  const setStatus = useAuthStore((state) => state.setStatus);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      if (!supabase) {
        setStatus("unauthenticated");
        return;
      }

      const { data, error } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (error) {
        setStatus("unauthenticated");
        return;
      }

      setSession(data.session);
    };

    void loadSession();

    if (!supabase) {
      return () => {
        isMounted = false;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [setSession, setStatus]);

  return children;
}
