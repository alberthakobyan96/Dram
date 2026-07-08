import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  session: Session | null;
  user: User | null;
  status: AuthStatus;
  setSession: (session: Session | null) => void;
  setStatus: (status: AuthStatus) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  status: "loading",
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      status: session ? "authenticated" : "unauthenticated",
    }),
  setStatus: (status) => set({ status }),
}));
