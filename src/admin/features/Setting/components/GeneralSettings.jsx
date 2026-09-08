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
} from "lucide-react";

import Button from "../../../components/common/Button";
import { useGeneralSetting } from "../hooks/useGeneralSetting";

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
export default function GeneralSettings() {
  const {
    isLoading,
    isSaving,
    register,
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

          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              ការកំណត់ហាងទូទៅ
            </h1>

            <p className="text-sm text-slate-500 mt-0.5">
              គ្រប់គ្រងព័ត៌មានអត្តសញ្ញាណ ទំនាក់ទំនង និងបណ្តាញសង្គមរបស់ហាង។
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="px-4 rounded-xl border-slate-200"
            onClick={handleCancel}
          >
            បោះបង់
          </Button>

          <Button
            type="submit"
            variant="primary"
            className="px-6 rounded-xl shadow-md shadow-blue-500/20"
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <RefreshCw size={16} className="animate-spin" />
                កំពុងរក្សាទុក...
              </span>
            ) : (
              "រក្សាទុកការផ្លាស់ប្តូរ"
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
            <label className="block text-xs font-bold text-slate-700 mb-2">
              រូបភាព Logo ហាង
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

                    <span className="text-white text-[9px] font-semibold">
                      ផ្លាស់ប្តូរ
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
              label="ឈ្មោះហាង"
              required
              error={errors.shop_name?.message}
            >
              <input
                type="text"
                placeholder="បញ្ចូលឈ្មោះហាង"
                className={inputClass(!!errors.shop_name)}
                {...register("shop_name")}
              />
            </FormField>

            <FormField
              label="លេខទូរស័ព្ទជំនួយ"
              required
              error={errors.phone?.message}
            >
              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="flex items-center px-3 bg-slate-100/80 border-r border-slate-200 text-xs font-bold text-slate-600">
                  +855
                </span>

                <input
                  type="tel"
                  placeholder="12 345 678"
                  className="w-full px-3.5 py-2.5 bg-transparent text-sm focus:outline-none text-slate-800"
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
            label="លេខសម្គាល់ Chat Telegram"
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
          <FormField label="ឯកសារ ឬ QR Support" error={errors.support?.message}>
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
                      : "ជ្រើសរើសឯកសារ Support..."}
                  </span>
                </div>

                <span className="text-[10px] bg-slate-200/70 text-slate-700 px-2.5 py-1 rounded-md font-bold shrink-0">
                  {supportFileName ? "ប្តូរ" : "Browse"}
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
                  title="លុបឯកសារ"
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
            label="អាសយដ្ឋានហាង"
            required
            error={errors.address?.message}
          >
            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="flex items-start px-3.5 pt-3 bg-slate-100/80 border-r border-slate-200 text-slate-400">
                <MapPin size={16} />
              </span>

              <textarea
                rows={3}
                placeholder="បញ្ចូលអាសយដ្ឋានលម្អិតរបស់ហាង..."
                className="w-full px-3.5 py-2.5 bg-transparent text-sm focus:outline-none resize-none text-slate-800"
                {...register("address")}
              />
            </div>
          </FormField>
        </div>

        {/* Social Media */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Globe size={18} className="text-blue-500" />
              បណ្តាញសង្គម (Social Media)
            </h3>

            <button
              type="button"
              onClick={() => append({ title: "", url: "", icon: "" })}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold transition-colors"
            >
              <Plus size={15} />
              បន្ថែមបណ្តាញសង្គម
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
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      ចំណងជើង
                    </label>

                    <input
                      type="text"
                      placeholder="ឧ. Telegram"
                      className={smallInputClass(
                        !!errors?.social_media?.[index]?.title,
                      )}
                      {...register(`social_media.${index}.title`)}
                    />
                  </div>

                  {/* URL */}
                  <div className="sm:col-span-5">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      URL ដំណរភ្ជាប់
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

                  {/* Icon */}
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Icon
                    </label>

                    <input
                      type="text"
                      placeholder="fa-telegram"
                      className={smallInputClass(false)}
                      {...register(`social_media.${index}.icon`)}
                    />
                  </div>

                  {/* Remove */}
                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="w-full sm:w-auto h-10 px-3 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      title="លុប"
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
                  មិនទាន់មានបណ្តាញសង្គម
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
      <label className="block text-xs font-bold text-slate-700">
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
