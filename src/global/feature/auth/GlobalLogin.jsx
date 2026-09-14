
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Mail,
  Lock,
} from "lucide-react";
import axiosClient from "@/api/axiosClient";
import { API_ENDPOINTS } from "@/api/endpoints";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/auth.schema";
import { ParticleBackground } from "./components/ParticleBackground";
import { Swirling } from "@/components/swirling";
import { useTranslation } from "react-i18next";

const GlobalLogin = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axiosClient.post(API_ENDPOINTS.USERS.LOGIN, {
        email: data.email,
        password: data.password,
      });

      const token = response.data?.token || response.data?.access_token;

      if (token) {
        login(
          token,
          response.data?.data ||
            response.data?.user || {
              email: data.email,
            },
        );

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          text: t("auth.loginSuccess"),
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        }).then(() => {
          navigate("/admin");
        });
      }
    } catch (error) {
      console.error("Login API Error:", error);

      let errorMessage = t("auth.loginFailed");

      if (!error.response) {
        errorMessage = t("auth.networkError");
      } else {
        errorMessage =
          error.response.data?.error ||
          error.response.data?.message ||
          errorMessage;
      }

      Swal.fire({
        icon: "error",
        title: t("common.error"),
        text: errorMessage,
        confirmButtonColor: "#2212ac",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2212ac] to-[#030208] relative overflow-hidden py-6 px-4">
      <ParticleBackground />

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
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
              {t("auth.loginDashboard")}
            </p>
          </div>

          {/* Form Section */}
          <div className="p-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                  {t("auth.usernameOrEmail")}
                </label>

                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2212ac] transition-colors">
                    <Mail size={16} />
                  </span>

                  <input
                    {...register("email")}
                    placeholder="admin@chomnenh.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2212ac]/20 focus:border-[#2212ac] outline-none transition-all text-sm text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                {errors.email && (
                  <span className="text-xs text-red-500 mt-1 block font-medium">
                    {t(errors.email.message)}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                    {t("auth.password")}
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#2212ac] hover:text-[#010643] transition-colors"
                  >
                    {t("auth.forgotPassword") || "Forgot Password?"}
                  </Link>
                </div>

                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2212ac] transition-colors">
                    <Lock size={16} />
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2212ac]/20 focus:border-[#2212ac] outline-none transition-all text-sm text-gray-800 placeholder:text-gray-400 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2212ac] transition-colors p-1"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <span className="text-xs text-red-500 mt-1 block font-medium">
                    {t(errors.password.message)}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 bg-gradient-to-r from-[#010643] to-[#2212ac] hover:from-[#2212ac] hover:to-[#010643] text-white font-medium py-3 rounded-xl shadow-lg shadow-[#2212ac]/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-sm active:scale-[0.99]"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Swirling className="size-5 text-white animate-spin" />
                  </span>
                ) : (
                  <>
                    <span>{t("auth.signIn")}</span>

                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Alternative */}
            <div className="mt-5 text-center text-xs text-gray-500">
              {t("auth.noAccount") || "Don't have an account?"}{" "}
              <Link
                to="/register"
                className="font-semibold text-[#2212ac] hover:text-[#010643] hover:underline"
              >
                {t("auth.signUp")}
              </Link>
            </div>

            {/* Footer Elements */}
            <div className="border-t mt-4 border-gray-100 space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-600">
                <ShieldCheck size={14} />
                <span>Secure 256-bit Encrypted Connection</span>
              </div>

              <div className="text-center">
                <Link
                  to="/"
                  className="text-xs font-medium text-gray-500 hover:text-[#2212ac] transition-colors inline-flex items-center gap-1"
                >
                  ← {t("auth.backToHome")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLogin;
