import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
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
          title: t("common.success"),
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
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1550] to-[#30517d] relative overflow-hidden py-4">
      {/* Particle Animation Background */}
      <ParticleBackground />

      <div className="w-full max-w-md px-4 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#8b2f67] to-[#5a1941] p-5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl mx-auto flex items-center justify-center border border-white/30 shadow-inner mb-2 overflow-hidden">
              <img
                src="images/chomnenh.png"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>

            <h2 className="text-xl font-bold text-white mb-0.5">CHOMNENH</h2>
            <p className="text-purple-100 text-xs font-medium">
              {t("auth.loginDashboard")}
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {t("auth.usernameOrEmail")}
                </label>
                <input
                  {...register("email")}
                  placeholder="admin@chomnenh.com"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                />
                {errors.email && (
                  <span className="text-[11px] text-red-600 mt-0.5 block">
                    {t(errors.email.message)}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {t("auth.password")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="password"
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm pr-10  [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[11px] text-red-600 mt-0.5 block">
                    {t(errors.password.message)}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs">
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  {t("auth.signUp")}
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-br from-[#8b2f67] to-[#5a1941] hover:from-[#742555] hover:to-[#3d1129] text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-[#8b2f67]/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Swirling className="size-6" />
                  </span>
                ) : (
                  <>
                    {t("auth.signIn")}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Back to Home & Security Badge */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] font-medium text-gray-400">
              <ShieldCheck size={13} />
              <span>Secure Encrypted Connection</span>
            </div>

            <div className="text-center mt-3 pt-3 border-t border-gray-100">
              <Link
                to="/"
                className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                {t("auth.backToHome")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLogin;
