import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

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

export const supabaseConfigError =
  "Missing Supabase environment variables. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.";

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
