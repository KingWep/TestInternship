import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ShieldCheck, Store } from "lucide-react";
import { ParticleBackground } from "./components/ParticleBackground";
import { Swirling } from "@/components/swirling";
import { useShopRegisterForm } from "./hooks/useShopRegisterForm";
import { AccountSetupStep } from "./components/AccountSetupStep";
import { ShopIdentityStep } from "./components/ShopIdentityStep";
import { ContactSupportStep } from "./components/ContactSupportStep";
import { useTranslation } from "react-i18next";

const GlobalRegister = () => {
  const { t } = useTranslation();
  const { form, currentStep, steps, nextStep, prevStep, onSubmit, isLoading } =
    useShopRegisterForm();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = form;

  // Calculate progress percentage
  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1550] to-[#30517d] relative overflow-hidden py-8">
      <ParticleBackground />

      <div className="w-full max-w-md px-4 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#8b2f67] to-[#5a1941] p-5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl mx-auto flex items-center justify-center border border-white/30 shadow-inner mb-2 overflow-hidden">
              <Store className="text-white" size={32} />
            </div>

            <h2 className="text-xl font-bold text-white mb-0.5">CHOMNENH</h2>
            <p className="text-purple-100 text-xs font-medium">
              {t('auth.createNewShop')}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-50 px-6 py-2 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-600">
                {t('auth.step')} {currentStep} {t('auth.of')} {steps.length}
              </span>
              <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                {steps[currentStep - 1].name}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Form */}
          <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="">
                {currentStep === 1 && (
                  <AccountSetupStep register={register} errors={errors} />
                )}
                {currentStep === 2 && (
                  <ShopIdentityStep
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                  />
                )}
                {currentStep === 3 && (
                  <ContactSupportStep
                    register={register}
                    errors={errors}
                    control={control}
                    setValue={setValue}
                    watch={watch}
                  />
                )}
              </div>

              <div className="flex items-center gap-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isLoading}
                    className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    <ArrowLeft size={16} /> {t('auth.back')}
                  </button>
                )}

                <button
                  type={currentStep === steps.length ? "submit" : "button"}
                  onClick={currentStep === steps.length ? undefined : nextStep}
                  disabled={isLoading}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-br from-blue-500 to-indigo-700 hover:bg-blue-900 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Swirling className="size-5" />
                      {t('auth.processing')}
                    </span>
                  ) : currentStep === steps.length ? (
                    <>
                      {t('auth.createShop')}
                      <ShieldCheck size={16} className="text-white/80" />
                    </>
                  ) : (
                    <>
                      {t('auth.next')}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Link to login */}
            <div className="text-center m-1">
              <span className="text-xs text-gray-600">{t('auth.alreadyHaveShop')}</span>
              <Link
                to="/admin"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                {t('auth.signIn')}
              </Link>
            </div>

            <div className=" pt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] font-medium text-gray-400">
              <ShieldCheck size={13} />
              <span>Secure Encrypted Connection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalRegister;
