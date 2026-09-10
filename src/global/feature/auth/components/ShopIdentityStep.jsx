import React, { useEffect, useState } from "react";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ShopIdentityStep = ({
  register,
  errors,
  setValue,
  watch,
}) => {
  const { t } = useTranslation();
  const logo = watch("logo");
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    if (!logo || logo.length === 0) {
      setLogoPreview(null);
      return;
    }

    const file = logo[0];

    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);

      return () => URL.revokeObjectURL(url);
    }

    // If API returns an existing logo URL
    if (typeof file === "string") {
      setLogoPreview(file);
    }
  }, [logo]);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setValue("logo", undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    setValue("logo", [file], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeLogo = () => {
    setValue("logo", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* Shop Name */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {t('auth.shopName')}
          <span className="text-red-500">*</span>
        </label>

        <input
          {...register("shop_name")}
          placeholder="My Awesome Shop"
          className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
        />

        {errors.shop_name && (
          <span className="text-[11px] text-red-600 mt-0.5 block">
            {t(errors.shop_name.message)}
          </span>
        )}
      </div>

      {/* Logo */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {t('auth.logo')}<span className="text-red-500">*</span>
          <span className="text-gray-400 font-normal"> (Optional)</span>
        </label>

        <div className="flex items-center gap-4">

          {/* Preview */}
          <div className="flex-shrink-0 relative">
            {logoPreview ? (
              <>
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                />

                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
                <ImageIcon
                  className="text-gray-400"
                  size={24}
                />
              </div>
            )}
          </div>

          {/* Upload */}
          <div className="flex-grow relative">
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
              id="logo-upload"
              onChange={handleLogoChange}
            />

            <label
              htmlFor="logo-upload"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-dashed border-blue-300 bg-blue-50/50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              <UploadCloud size={18} />
              {t('auth.chooseImage')}
            </label>

            <p className="text-[10px] text-gray-500 mt-1">
              Max 1MB (JPG, PNG, WEBP)
            </p>
          </div>
        </div>

        {errors.logo && (
          <span className="text-[11px] text-red-600 mt-0.5 block">
            {t(errors.logo.message)}
          </span>
        )}
      </div>

      {/* Telegram */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {t('auth.telegramId')}
          <span className="text-gray-400 font-normal"> (Optional)</span>
        </label>

        <input
          {...register("chat_id")}
          placeholder="@username or ID"
          className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
        />

        {errors.chat_id && (
          <span className="text-[11px] text-red-600 mt-0.5 block">
            {t(errors.chat_id.message)}
          </span>
        )}
      </div>

    </div>
  );
};