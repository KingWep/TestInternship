import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/validations/auth.schema";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { API_ENDPOINTS } from "@/api/endpoints";
import axiosClient from "@/api/axiosClient";

export default function useForgotPassword(t) {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema(t)),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      trigger();
    }
  }, [i18n.language, trigger, errors]);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axiosClient.post(API_ENDPOINTS.SETTINGS.FORGOT_PASSWORD, {
        email: data.email,
      });

      Swal.fire({
        icon: "success",
        title: t("auth.emailSentSuccess"),
        text: t("auth.forgot_password.check_email"),
        confirmButtonColor: "#2212ac",
      });
      setIsEmailSent(true);
      setSubmittedEmail(data.email);
    } catch (error) {
      console.error(
        "Error occurred while sending forgot password email:",
        error,
      );
      Swal.fire({
        icon: "error",
        title: t("common.error"),
        text: t("auth.forgot_password.error"),
        confirmButtonColor: "#2212ac",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleResendEmail = async () => {
    await onSubmit({ email: submittedEmail });
  }

  const handleChangeEmail = () => {
    setIsEmailSent(false);
    setSubmittedEmail("");
  }
  return {
    register,
    handleSubmit,
    errors,
    loading,
    isEmailSent,
    submittedEmail,
    onSubmit,
    handleResendEmail,
    handleChangeEmail
  };
}
