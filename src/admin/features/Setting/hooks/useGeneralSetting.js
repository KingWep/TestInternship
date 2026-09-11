import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { settingSchema } from "../schemas/settingSchema";
import {
  useSettingsQuery,
  useUpdateSettingMutation,
} from "../../../../queries/settings/useSettingQueries";

const getLogoUrl = (logo) => {
  if (!logo) return "";
  if (logo.startsWith("http")) return logo;

  const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";
  return `${baseUrl}${logo.startsWith("/") ? "" : "/"}${logo}`;
};
const getSupportFileName = (support) => {
  if (!support || typeof support !== "string") return "";
  return support.split("/").pop() || "";
};

export function useGeneralSetting() {
  const { t } = useTranslation()
  const { user } = useAuth();
  const shopCode = user?.shop?.code;
  const { data: settingData, isLoading } = useSettingsQuery(shopCode);
  const updateMutation = useUpdateSettingMutation(shopCode);

  const [logoPreview, setLogoPreview] = useState("");
  const [supportFileName, setSupportFileName] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      shop_name: "",
      shop_code: "",
      phone: "",
      logo: "",
      chat_id: "",
      support: "",
      social_media: [],
      address: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "social_media",
  });

  useEffect(() => {
    if (!settingData) return;

    reset({
      shop_name: settingData.shop_name || "",
      shop_code: settingData.shop_code || "",
      phone: settingData.phone || "",
      logo: settingData.logo || "",
      chat_id: settingData.chat_id || "",
      support: settingData.support || "",
      social_media: Array.isArray(settingData.social_media)
        ? settingData.social_media
        : [],
      address: settingData.address || "",
    });

    setLogoPreview(getLogoUrl(settingData.logo));
    setSupportFileName(getSupportFileName(settingData.support));
  }, [settingData, reset]);

  // Logo file selection handler
  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: t('settings.invalidFile'),
        text: t('settings.selectImageFile'),
      });
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: t('settings.imageTooLarge'),
        text: t('settings.imageSizeLimit'),
      });
      return;
    }

    setValue("logo", file, { shouldValidate: true, shouldDirty: true });
    setLogoPreview(URL.createObjectURL(file));
  };

  // Support file selection handler
  const handleSupportFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: t('settings.fileTooLarge'),
        text: t('settings.fileSizeLimit'),
      });
      return;
    }

    setValue("support", file, { shouldValidate: true, shouldDirty: true });
    setSupportFileName(file.name);
  };

  // Clear the support file
  const handleClearSupport = () => {
    setValue("support", "", { shouldDirty: true, shouldValidate: true });
    setSupportFileName("");
  };

  // Form submit — build FormData and fire mutation
  const onSubmit = (data) => {
    if (!settingData?.id) {
      Swal.fire({
        icon: "error",
        title: t('settings.settingIdNotFound'),
        text: t('settings.cannotEditSetting'),
      });
      return;
    }
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      // Social media
      if (key === "social_media") {
        formData.append("social_media", JSON.stringify(value || []));
        return;
      }

      // Logo
      if (key === "logo") {
        if (value instanceof File) {
          formData.append("logo", value);
        }
        return;
      }

      // Support
      if (key === "support") {
        formData.append("support", value);
        return;
      }

      // Other fields
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }

      console.log("LOGO:", data.logo);
      console.log("LOGO IS FILE:", data.logo instanceof File);

      console.log("SUPPORT:", data.support);
      console.log("SUPPORT IS FILE:", data.support instanceof File);
    });

    updateMutation.mutate(
      { id: settingData.id, data: formData },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: t('common.success'),
            text: t('settings.saveSuccess'),
            timer: 1500,
            showConfirmButton: false,
          });
        },
        onError: (error) => {
          Swal.fire({
            icon: "error",
            title: t('common.failed'),
            text:
              error.response?.data?.message || t('settings.saveFailed'),
          });
        },
      },
    );
  };

  // Cancel — restore form to last saved state
  const handleCancel = () => {
    if (!settingData) return;

    reset({
      shop_name: settingData.shop_name || "",
      shop_code: settingData.shop_code || "",
      phone: settingData.phone || "",
      logo: settingData.logo || "",
      chat_id: settingData.chat_id || "",
      support: settingData.support || "",
      social_media: Array.isArray(settingData.social_media)
        ? settingData.social_media
        : [],
      address: settingData.address || "",
    });

    setLogoPreview(getLogoUrl(settingData.logo));
    setSupportFileName(getSupportFileName(settingData.support));
  };

  return {
    isLoading,
    isSaving: updateMutation.isPending,
    register,
    control,
    setValue,
    handleSubmit,
    errors,
    fields,
    append,
    remove,
    logoPreview,
    supportFileName,
    onSubmit,
    handleCancel,
    handleLogoChange,
    handleSupportFileChange,
    handleClearSupport,
  };
}
