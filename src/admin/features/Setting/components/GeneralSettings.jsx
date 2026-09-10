import React from "react";
import {
  Store,
  MapPin,
  MessageCircle,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Globe,
  RefreshCw,
  FileText,
  X,
  Send,
  Users,
  Video,
  Camera,
  AtSign,
  Play,
  Briefcase,
} from "lucide-react";
import Select from "react-select";
import { Controller } from "react-hook-form";

import Button from "../../../components/common/Button";
import { useGeneralSetting } from "../hooks/useGeneralSetting";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

// =========================================================
// Social Media icon options for the react-select picker
// =========================================================
const socialIconOptions = [
  { value: "fa-telegram",  label: "Telegram",        title: "Telegram",  icon: <Send      size={16} className="text-blue-500"  /> },
  { value: "fa-facebook",  label: "Facebook",        title: "Facebook",  icon: <Users     size={16} className="text-blue-600"  /> },
  { value: "fa-tiktok",    label: "TikTok",          title: "TikTok",    icon: <Video     size={16} className="text-slate-900" /> },
  { value: "fa-instagram", label: "Instagram",       title: "Instagram", icon: <Camera    size={16} className="text-pink-500"  /> },
  { value: "fa-twitter",   label: "Twitter / X",     title: "Twitter",   icon: <AtSign    size={16} className="text-sky-400"   /> },
  { value: "fa-youtube",   label: "YouTube",         title: "YouTube",   icon: <Play      size={16} className="text-red-500"   /> },
  { value: "fa-linkedin",  label: "LinkedIn",        title: "LinkedIn",  icon: <Briefcase size={16} className="text-blue-700"  /> },
  { value: "fa-globe",     label: "Website / Other", title: "Website",   icon: <Globe     size={16} className="text-slate-500" /> },
];

// Custom option renderer: shows icon + label side by side
const formatOptionLabel = ({ label, icon }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="text-xs font-medium text-slate-800">{label}</span>
  </div>
);

// react-select style overrides matching the existing smallInputClass aesthetic
const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "36px",
    borderRadius: "0.75rem",
    borderColor: state.isFocused ? "#3b82f6" : "#e2e8f0",
    backgroundColor: "#ffffff",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(59,130,246,0.2)" : "none",
    fontSize: "0.75rem",
    cursor: "pointer",
    "&:hover": { borderColor: "#3b82f6" },
    transition: "all 0.15s ease",
  }),
  valueContainer: (base) => ({ ...base, padding: "2px 8px" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({ ...base, padding: "4px" }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.75rem",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    overflow: "hidden",
    zIndex: 50,
  }),
  menuList: (base) => ({ ...base, padding: "4px" }),
  option: (base, state) => ({
    ...base,
    borderRadius: "0.5rem",
    padding: "6px 10px",
    backgroundColor: state.isSelected ? "#eff6ff" : state.isFocused ? "#f8fafc" : "transparent",
    color: "#1e293b",
    cursor: "pointer",
  }),
  singleValue: (base) => ({ ...base, color: "#1e293b" }),
  placeholder: (base) => ({ ...base, color: "#94a3b8", fontSize: "0.75rem" }),
};

// =========================================================
// Helper: truncate long file names
// =========================================================
function truncateFileName(name, maxLength = 25) {
  if (!name) return "";
  if (name.length <= maxLength) return name;

  // Extract extension and base name
  const extension = name.slice(((name.lastIndexOf(".") - 1) >>> 0) + 1);
  const baseName = name.substring(0, name.lastIndexOf("."));

  if (!baseName) return name; // fallback if no extension

  const charsToShow = maxLength - extension.length - 3; // 3 for "..."
  if (charsToShow <= 0) return name;

  return `${baseName.substring(0, charsToShow)}...${extension}`;
}

// =========================================================
// Main Component
// =========================================================
export default function GeneralSettings() {
  const { user } = useAuth();
  const shopCode = user?.shop?.code;
  const { t } = useTranslation();
  const {
    isLoading,
    isSaving,
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
  } = useGeneralSetting();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse p-4">
        <div className="h-8 bg-slate-200 rounded-lg w-64" />
        <div className="h-96 bg-slate-100 rounded-3xl" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
            <Store size={24} />
          </div>

          <div className="mb-6 pb-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">{t('settings.generalSettings')}</h3>
            <p className="text-sm text-slate-500 mt-1">
              {t('settings.generalDesc')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" type="button" onClick={handleCancel}>
            {t('common.cancel')}
          </Button>

          <Button variant="primary" type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                {t('common.saving')}
              </>
            ) : (
              t('settings.saveChanges')
            )}
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-xs space-y-8">
        {/* Logo + Shop Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-8 border-b border-slate-100">
          {/* Logo Upload */}
          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <label className="text-sm font-semibold text-slate-700 block">
              {t('settings.shopLogo')}
            </label>

            <label
              htmlFor="shop-logo"
              className="relative flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-blue-50/30 hover:border-blue-400 transition-all cursor-pointer overflow-hidden group shadow-xs"
            >
              {logoPreview ? (
                <>
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="w-full h-full object-contain p-2 bg-white"
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-1 shadow-sm">
                      <Upload size={14} />
                    </div>

                    <span className="text-xs font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                      {t('settings.change')}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-center p-2">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-xs mb-1">
                    <ImageIcon size={16} className="text-blue-500" />
                  </div>

                  <span className="text-[11px] font-semibold text-slate-700">
                    Upload Logo
                  </span>
                </div>
              )}

              <input
                id="shop-logo"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleLogoChange}
              />
            </label>

            {errors.logo && (
              <p className="text-red-500 text-xs mt-1">{errors.logo.message}</p>
            )}
          </div>

          {/* Shop name + phone */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label={t('settings.shopName')}
              required
              error={errors.shop_name?.message}
            >
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder={t('settings.shopNamePlaceholder')}
                {...register("shop_name")}
              />
            </FormField>

            <FormField
              label={t('settings.supportPhone')}
              required
              error={errors.phone?.message}
            >
              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="flex items-center px-3 bg-slate-100/80 border-r border-slate-200 text-xs font-bold text-slate-600">
                  +855
                </span>

                <input
                  type="tel"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder={t('settings.phonePlaceholder')}
                  {...register("phone")}
                />
              </div>
            </FormField>
          </div>
        </div>

        {/* Hidden shop code */}
        <input type="hidden" {...register("shop_code")} />

        {/* Telegram + Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <FormField
            label={t('settings.telegramChatId')}
            error={errors.chat_id?.message}
          >
            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="flex items-center px-3.5 bg-slate-100/80 border-r border-slate-200 text-slate-400">
                <MessageCircle size={16} />
              </span>

              <input
                type="text"
                placeholder="-1004454335612"
                className="w-full px-3.5 py-2.5 bg-transparent text-sm focus:outline-none text-slate-800"
                {...register("chat_id")}
              />
            </div>
          </FormField>

          {/* Support file */}
          <FormField label={t('settings.supportDocument')} error={errors.support?.message}>
            <div className="flex items-center gap-3">
              <label
                htmlFor="support-file"
                className="flex-1 flex items-center justify-between px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-600 hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  {supportFileName ? (
                    <FileText size={16} className="text-blue-500 shrink-0" />
                  ) : (
                    <Upload size={16} className="text-slate-400 shrink-0" />
                  )}

                  <span
                    className={`truncate text-xs ${
                      supportFileName
                        ? "font-bold text-slate-800"
                        : "font-medium text-slate-400"
                    }`}
                    title={supportFileName} // Shows full name on hover
                  >
                    {supportFileName
                      ? truncateFileName(supportFileName, 22)
                      : t('settings.selectSupportDocument')}
                  </span>
                </div>

                <span className="text-[10px] bg-slate-200/70 text-slate-700 px-2.5 py-1 rounded-md font-bold shrink-0">
                  {supportFileName ? t('settings.change') : t('common.browse')}
                </span>
              </label>

              <input
                id="support-file"
                type="file"
                className="hidden"
                onChange={handleSupportFileChange}
              />

              {supportFileName && (
                <button
                  type="button"
                  onClick={handleClearSupport}
                  className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors shrink-0"
                  title={t('common.deleteFile')}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </FormField>
        </div>

        {/* Address */}
        <div>
          <FormField
            label={t('settings.address')}
            required
            error={errors.address?.message}
          >
            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="flex items-start px-3.5 pt-3 bg-slate-100/80 border-r border-slate-200 text-slate-400">
                <MapPin size={16} />
              </span>

              <textarea
                rows={3}
                placeholder={t('settings.addressDetailedPlaceholder')}
                className="w-full px-3.5 py-2.5 bg-transparent text-sm focus:outline-none resize-none text-slate-800"
                {...register("address")}
              />
            </div>
          </FormField>
        </div>

        {/* Social Media */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Store size={18} className="text-blue-500" /> {t('settings.shopIdentity')}
            </h4>
            <button
              type="button"
              onClick={() => append({ title: "", url: "", icon: "" })}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold transition-colors"
            >
              <Plus size={15} />
              {t('settings.addSocialMedia')}
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl relative group transition-all hover:border-blue-200"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  {/* Title */}
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {t('settings.phone')}
                    </label>

                    <input
                      type="text"
                      placeholder={t('settings.socialMediaPlaceholder')}
                      className={smallInputClass(
                        !!errors?.social_media?.[index]?.title,
                      )}
                      {...register(`social_media.${index}.title`)}
                    />
                  </div>

                  {/* URL */}
                  <div className="sm:col-span-5">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      {t('settings.socialMediaUrl')}
                    </label>

                    <input
                      type="text"
                      placeholder="https://t.me/yourpage"
                      className={smallInputClass(
                        !!errors?.social_media?.[index]?.url,
                      )}
                      {...register(`social_media.${index}.url`)}
                    />
                  </div>

                  {/* Icon — react-select picker */}
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {t('settings.shopDescription')}
                    </label>

                    <Controller
                      name={`social_media.${index}.icon`}
                      control={control}
                      render={({ field: controllerField }) => {
                        // Resolve the stored value string back to a full option object
                        const selectedOption =
                          socialIconOptions.find(
                            (opt) => opt.value === controllerField.value,
                          ) ?? null;

                        return (
                          <Select
                            inputId={`social_media_${index}_icon`}
                            options={socialIconOptions}
                            value={selectedOption}
                            onChange={(option) => {
                              // Persist the icon value string (e.g. "fa-telegram")
                              controllerField.onChange(option?.value ?? "");
                              // Auto-fill title with the option title; remains editable
                              if (option?.title) {
                                setValue(
                                  `social_media.${index}.title`,
                                  option.title,
                                  { shouldDirty: true },
                                );
                              }
                            }}
                            onBlur={controllerField.onBlur}
                            formatOptionLabel={formatOptionLabel}
                            styles={selectStyles}
                            placeholder={t('settings.selectIcon')}
                            isClearable
                            menuPosition="fixed"
                          />
                        );
                      }}
                    />
                  </div>

                  {/* Remove */}
                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="w-full sm:w-auto h-10 px-3 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      title={t('common.delete')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {fields.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-xs mb-2">
                  <LinkIcon size={18} />
                </div>

                <p className="text-xs font-semibold text-slate-600">
                  {t('settings.noSocialMedia')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

// =========================================================
// Shared UI sub-components
// =========================================================

function FormField({
  label,
  required = false,
  error,
  children,
  className = "",
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {children}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function inputClass(hasError = false) {
  return `
    w-full px-3.5 py-2.5 bg-slate-50/50 border rounded-xl
    text-sm text-slate-800 placeholder:text-slate-400
    focus:outline-none focus:bg-white focus:border-blue-500
    focus:ring-2 focus:ring-blue-500/20 transition-all
    ${hasError ? "border-red-500 bg-red-50/10" : "border-slate-200"}
  `;
}

function smallInputClass(hasError = false) {
  return `
    w-full px-3 py-2 bg-white border rounded-xl
    text-xs text-slate-800 placeholder:text-slate-400
    focus:outline-none focus:border-blue-500
    focus:ring-2 focus:ring-blue-500/20 transition-all
    ${hasError ? "border-red-500 bg-red-50/10" : "border-slate-200"}
  `;
}