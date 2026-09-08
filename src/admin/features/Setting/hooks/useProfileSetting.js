import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { profileSchema } from "../schemas/profileSchema";
import { useAdminAuth } from "../../../../context/AdminAuthContext";
import {
  useUpdateUserMutation,
  useUsersListQuery,
} from "../../../../queries/users/useUserQueries";

// =========================================================
// useProfileSetting
// =========================================================
export function useProfileSetting() {
  const { user: authUser } = useAdminAuth();

  const { data: allUsers, isLoading } = useUsersListQuery();

  // Find the detailed user record that matches the authenticated user
  const fullUserDetail = allUsers?.find((u) => u.email === authUser?.email);
  const userId = fullUserDetail?.id || authUser?.id;

  const updateMutation = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: authUser?.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  // Sync form with the resolved user data
  useEffect(() => {
    if (fullUserDetail || authUser) {
      reset({
        name: fullUserDetail?.name || authUser?.name || "",
        email: fullUserDetail?.email || authUser?.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [fullUserDetail, authUser, reset]);

  // Form submit — only include password when provided
  const onSubmit = (data) => {
    if (!userId) return;

    const payload = {
      name: data.name,
      email: data.email,
    };

    if (data.password) {
      payload.password = data.password;
    }

    updateMutation.mutate({ id: userId, data: payload });
  };

  // Derived display values
  const displayName =
    fullUserDetail?.name || authUser?.name || authUser?.email || "A";
  const displayRole = fullUserDetail?.role || authUser?.role || "Admin";

  return {
    isLoading,
    isSaving: updateMutation.isPending,
    register,
    handleSubmit,
    reset,
    errors,
    onSubmit,
    displayName,
    displayRole,
  };
}
