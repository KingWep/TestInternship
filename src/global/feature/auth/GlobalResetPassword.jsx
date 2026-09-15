import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Lock, Eye, ShieldCheck } from "lucide-react";
import  useResetPassword  from "./hooks/useResetPassword";

export default function GlobalResetPassword() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  console.log(window.location.href);
console.log("TOKEN:", searchParams.get("token"));
  console.log("RESET TOKEN:", token);

  const {
    register,
    handleSubmit,
    errors,
    loading,
    isPasswordReset,
    error,
    resetPassword,
  } = useResetPassword(token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2212ac] to-[#030208] relative overflow-hidden py-6 px-4">
      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-[#010643] to-[#2212ac] p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center border border-white/30 shadow-inner mb-3 overflow-hidden transition-transform hover:scale-105 duration-300">
              <img
                src="images/chomnenh.png"
                alt="Chomnenh Logo"
                className="object-cover w-full h-full drop-shadow-md"
              />
            </div>

            <h2 className="text-2xl font-black tracking-tight text-white mb-1">
              CHOMNENH
            </h2>

            <p className="text-indigo-200 text-xs font-medium tracking-wide">
              Secure Password Update
            </p>
          </div>

          <div className="p-7">
            <div className="mb-5">
              <h3 className="text-base font-bold text-gray-800 mb-1">
                Create New Password
              </h3>

              <p className="text-xs text-gray-500 leading-relaxed">
                Your new password must be different from any of your previous
                passwords.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(resetPassword)}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                  New Password
                </label>

                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2212ac] transition-colors">
                    <Lock size={16} />
                  </span>

                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("newPassword")}
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2212ac]/20 focus:border-[#2212ac] outline-none transition-all text-sm text-gray-800 placeholder:text-gray-400"
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2212ac] transition-colors p-1"
                  >
                    <Eye size={16} />
                  </button>
                </div>

                {errors.newPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                  Confirm Password
                </label>

                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2212ac] transition-colors">
                    <Lock size={16} />
                  </span>

                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2212ac]/20 focus:border-[#2212ac] outline-none transition-all text-sm text-gray-800 placeholder:text-gray-400"
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2212ac] transition-colors p-1"
                  >
                    <Eye size={16} />
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 bg-gradient-to-r from-[#010643] to-[#2212ac] hover:from-[#2212ac] hover:to-[#010643] text-white font-medium py-3 rounded-xl shadow-lg shadow-[#2212ac]/25 transition-all flex items-center justify-center gap-2 group text-sm active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-gray-500">
              Remember Password?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#2212ac] hover:text-[#010643] hover:underline"
              >
                Login
              </Link>
            </div>

            <div className="border-t mt-4 pt-3 border-gray-100 space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-600">
                <ShieldCheck size={14} />
                <span>256-bit Secure Connection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
