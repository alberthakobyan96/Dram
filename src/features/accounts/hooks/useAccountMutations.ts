import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateAccountInput,
  UpdateAccountInput,
} from "../../../entities/accounts";
import {
  createAccount,
  deleteAccount,
  updateAccount,
} from "../api/accountsApi";
import { accountsQueryKey } from "./useAccounts";

export const useCreateAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateAccountInput) => createAccount(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: accountsQueryKey });
    },
  });
};

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateAccountInput) => updateAccount(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: accountsQueryKey });
    },
  });
};

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountId: string) => deleteAccount(accountId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: accountsQueryKey });
    },
  });
};
