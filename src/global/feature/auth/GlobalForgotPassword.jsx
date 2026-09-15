import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Mail,
  CheckCircle2,
  RefreshCcw,
} from "lucide-react";
import { ParticleBackground } from "./components/ParticleBackground";
import { Swirling } from "@/components/swirling";
import { useTranslation } from "react-i18next";
import useForgotPassword from "./hooks/useForgotPassword";

const GlobalForgotPassword = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    errors,
    loading,
    isEmailSent,
    submittedEmail,
    onSubmit,
    handleResendEmail,
    handleChangeEmail,
  } = useForgotPassword(t);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2212ac] to-[#030208] relative overflow-hidden py-6 px-4">
      <ParticleBackground />

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
              {t("auth.passwordRecovery")}
            </p>
          </div>

          <div className="p-7">
            {!isEmailSent ? (
              <>
                <div className="mb-5">
                  <h3 className="text-base font-bold text-gray-800 mb-1">
                    {t("auth.forgotPasswordTitle") || "Forgot Password"}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {t("auth.forgotPasswordSubtitle") ||
                      "Enter the email address you used to create the account, and we will email you instructions to reset your password."}
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                      {t("auth.emailAddress") || "Email Address"}
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
                        {errors.email.message}
                      </span>
                    )}
                  </div>

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
                        <span>
                          {t("auth.sendEmail") || "Send Email"}
                        </span>

                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-3 space-y-4">
                <div className="w-12 h-12 bg-indigo-50 text-[#2212ac] rounded-2xl mx-auto flex items-center justify-center border border-indigo-100 shadow-inner">
                  <CheckCircle2 size={24} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-800 mb-1">
                    {t("auth.emailSent") || "Email Sent"}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed px-2">
                    {t("auth.emailSentDescription", {
                      email: submittedEmail,
                    }) ||
                      `We have sent you an email at ${submittedEmail}. Check your inbox and follow the instructions to reset your account password.`}
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs">
                  <p className="text-gray-500">
                    {t("auth.didNotReceiveEmail") ||
                      "Did not receive the email?"}{" "}

                    <button
                      type="button"
                      onClick={handleResendEmail}
                      disabled={loading}
                      className="font-semibold text-[#2212ac] hover:underline inline-flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCcw
                        size={12}
                        className={loading ? "animate-spin" : ""}
                      />

                      {loading
                        ? t("auth.sending") || "Sending..."
                        : t("auth.resendEmail") || "Resend Email"}
                    </button>
                  </p>

                  <p className="text-gray-500">
                    {t("auth.wrongEmailAddress") ||
                      "Wrong Email Address?"}{" "}

                    <button
                      type="button"
                      onClick={handleChangeEmail}
                      className="font-semibold text-[#2212ac] hover:underline"
                    >
                      {t("auth.changeEmailAddress") ||
                        "Change Email Address"}
                    </button>
                  </p>
                </div>
              </div>
            )}

            <div className="mt-5 text-center text-xs text-gray-500">
              {t("auth.rememberPassword") || "Remember Password?"}{" "}

              <Link
                to="/login"
                className="font-semibold text-[#2212ac] hover:text-[#010643] hover:underline"
              >
                {t("auth.signIn") || "Login"}
              </Link>
            </div>

            <div className="border-t mt-4 pt-3 border-gray-100 space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-600">
                <ShieldCheck size={14} />

                <span>
                  {t("auth.secureConnection256")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalForgotPassword;