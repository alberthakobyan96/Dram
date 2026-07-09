import type { DashboardState } from "./types";

export const dashboardDefaultState: DashboardState = {
  summary: {
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    currency: "USD",
  },
  transactions: [],
};
