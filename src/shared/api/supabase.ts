import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const missingSupabaseEnv = [
  ["VITE_SUPABASE_URL", supabaseUrl],
  ["VITE_SUPABASE_ANON_KEY", supabaseAnonKey],
]
  .filter(([, value]) => !value)
  .map(([name]) => name);
const isSupabaseConfigured = missingSupabaseEnv.length === 0;

const rememberSessionKey = "dram.remember_session";

const getStorage = (remember: boolean) =>
  remember ? window.localStorage : window.sessionStorage;

const authStorage = {
  getItem(key: string) {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key);
  },
  setItem(key: string, value: string) {
    if (typeof window === "undefined") {
      return;
    }

    const remember = window.localStorage.getItem(rememberSessionKey) !== "false";
    const primaryStorage = getStorage(remember);
    const secondaryStorage = getStorage(!remember);

    secondaryStorage.removeItem(key);
    primaryStorage.setItem(key, value);
  },
  removeItem(key: string) {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  },
};

export const setRememberSession = (remember: boolean) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(rememberSessionKey, String(remember));
};

export const supabaseConfigError = isSupabaseConfigured
  ? ""
  : `Supabase is not configured. Missing environment variable${
      missingSupabaseEnv.length > 1 ? "s" : ""
    }: ${missingSupabaseEnv.join(
      ", ",
    )}. Copy .env.example to .env.local and fill in your Supabase URL and Anon Key.`;

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(supabaseConfigError);
}

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
        storage: authStorage,
      },
    })
  : null;
