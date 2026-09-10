import React from "react";
import { User, KeyRound, ShieldAlert, ShieldCheck } from "lucide-react";
import Button from "../../../components/common/Button";
import { useProfileSetting } from "../hooks/useProfileSetting";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function ProfileSettings() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const {
    isLoading,
    isSaving,
    register,
    handleSubmit,
    reset,
    errors,
    onSubmit,
    displayName,
    displayRole,
  } = useProfileSetting();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-slate-200 rounded w-1/3"></div>
        <div className="h-96 bg-slate-100 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      <div className="mb-6 pb-6 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{t('settings.profile')}</h3>
          <p className="text-sm text-slate-500 mt-1">
            {t('settings.profileDescription')}
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-8">
        {/* Avatar */}
        <div className="flex items-center gap-6 border-b border-slate-100 pb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md flex items-center justify-center overflow-hidden shrink-0 text-white text-4xl font-bold uppercase ring-4 ring-slate-50">
            {displayName.charAt(0)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Name */}
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t('settings.name')} <span className="text-red-500">*</span>
            </label>
            <div
              className={`flex items-center w-full bg-slate-50 border rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors ${
                errors.name ? "border-red-500" : "border-slate-200"
              }`}
            >
              <div className="pl-3.5 pr-2 py-2.5 text-slate-400 border-r border-slate-200 bg-slate-100">
                <User size={16} />
              </div>
              <input
                type="text"
                placeholder={t('settings.namePlaceholder')}
                className="w-full px-3 py-2.5 bg-transparent text-sm focus:outline-none text-slate-800"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t('settings.email')} <span className="text-red-500">*</span>
            </label>
            <div
              className={`flex items-center w-full bg-slate-50 border rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors ${
                errors.email ? "border-red-500" : "border-slate-200"
              }`}
            >
              <input
                type="email"
                placeholder={t('settings.emailPlaceholder')}
                className="w-full px-3.5 py-2.5 bg-transparent text-sm focus:outline-none text-slate-800"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Role (read-only) */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t('settings.role')}
            </label>
            <div className="flex items-center w-full bg-slate-100 border border-slate-200 rounded-xl overflow-hidden cursor-not-allowed">
              <div className="pl-3.5 pr-2 py-2.5 text-slate-400 border-r border-slate-200">
                <ShieldAlert size={16} />
              </div>
              <input
                type="text"
                value={displayRole}
                readOnly
                className="w-full px-3 py-2.5 bg-transparent text-sm text-slate-500 cursor-not-allowed outline-none select-none font-medium"
              />
            </div>
            <p className="mt-1 text-xs text-slate-400 flex items-center gap-1">
              <ShieldCheck size={12} /> {t('settings.roleCannotChange')}
            </p>
          </div>

          {/* New Password */}
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t('settings.newPassword')}
            </label>
            <div
              className={`flex items-center w-full bg-slate-50 border rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors ${
                errors.password ? "border-red-500" : "border-slate-200"
              }`}
            >
              <div className="pl-3.5 pr-2 py-2.5 text-slate-400 border-r border-slate-200 bg-slate-100">
                <KeyRound size={16} />
              </div>
              <input
                type="password"
                placeholder={t('settings.leaveEmptyPassword')}
                className="w-full px-3 py-2.5 bg-transparent text-sm focus:outline-none text-slate-800"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t('settings.confirmNewPassword')}
            </label>
            <div
              className={`flex items-center w-full bg-slate-50 border rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors ${
                errors.confirmPassword ? "border-red-500" : "border-slate-200"
              }`}
            >
              <div className="pl-3.5 pr-2 py-2.5 text-slate-400 border-r border-slate-200 bg-slate-100">
                <KeyRound size={16} />
              </div>
              <input
                type="password"
                placeholder={t('settings.confirmPasswordPlaceholder')}
                className="w-full px-3 py-2.5 bg-transparent text-sm focus:outline-none text-slate-800"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100 gap-3">
          <Button variant="outline" type="button" className="px-6 rounded-xl" onClick={() => reset()}>
            {t('common.cancel')}
          </Button>
          <Button variant="primary" type="submit" className="px-6 rounded-xl" disabled={isSaving}>
            {isSaving ? t('common.saving') : t('settings.saveProfile')}
          </Button>
        </div>
      </div>
    </form>
  );
}
