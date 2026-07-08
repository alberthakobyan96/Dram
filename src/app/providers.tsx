import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { AuthSessionProvider } from "../features/auth";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthSessionProvider>{children}</AuthSessionProvider>
    </QueryClientProvider>
  );
}
