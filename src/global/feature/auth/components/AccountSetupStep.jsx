import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const AccountSetupStep = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
          ឈ្មោះពេញ (Full Name) <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name")}
          placeholder="John Doe"
          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-sm"
        />
        {errors.name && (
          <span className="text-[10px] text-red-600 mt-0.5 block">
            {errors.name.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
          អ៊ីមែល (Email) <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email")}
          placeholder="admin@example.com"
          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-sm"
        />
        {errors.email && (
          <span className="text-[10px] text-red-600 mt-0.5 block">
            {errors.email.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
          លេខទូរស័ព្ទ (Phone Number) <span className="text-red-500">*</span>
        </label>
        <input
          {...register("phone")}
          placeholder="012345678"
          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-sm"
        />
        {errors.phone && (
          <span className="text-[10px] text-red-600 mt-0.5 block">
            {errors.phone.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">
          ពាក្យសម្ងាត់ (Password) <span className="text-red-500">*</span>
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
          <span className="text-[10px] text-red-600 mt-0 block">
            {errors.password.message}
          </span>
        )}
      </div>
    </div>
  );
};