import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";

export const AccountSetupStep = ({ register, errors }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          {t('auth.fullName')} <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name")}
          placeholder="John Doe"
          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-sm"
        />
        {errors.name && (
          <span className="text-[11px] text-red-600 mt-1 block">
            {t(errors.name.message)}
          </span>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          {t('auth.email')} <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email")}
          placeholder="admin@example.com"
          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-sm"
        />
        {errors.email && (
          <span className="text-[11px] text-red-600 mt-1 block">
            {t(errors.email.message)}
          </span>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          {t('auth.phone')} <span className="text-red-500">*</span>
        </label>
        <input
          {...register("phone")}
          placeholder="012345678"
          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-sm"
        />
        {errors.phone && (
          <span className="text-[11px] text-red-600 mt-1 block">
            {t(errors.phone.message)}
          </span>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          {t('auth.password')} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="••••••••"
            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-sm pr-9"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {errors.password && (
          <span className="text-[11px] text-red-600 mt-1 block">
            {t(errors.password.message)}
          </span>
        )}
      </div>
    </div>
  );
};