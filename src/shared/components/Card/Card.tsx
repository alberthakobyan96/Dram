import type { ReactNode } from "react";
import { theme } from "../../lib/theme";

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div
      style={{
        background: theme.colors.surface,
        borderRadius: theme.radius.lg,
        padding: 24,
        boxShadow: "0 8px 24px rgba(0,0,0,.06)",
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      {children}
    </div>
  );
}