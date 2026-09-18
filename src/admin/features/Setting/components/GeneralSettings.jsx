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
  FileText,
  X,
  Send,
  Users,
  Video,
  Camera,
  AtSign,
  Play,
  Briefcase,
  QrCode,
  Save,
  RotateCcw,
} from "lucide-react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGeneralSetting } from "../hooks/useGeneralSetting";

const socialIconOptions = [
  {
    value: "telegram",
    label: "Telegram",
    icon: Send,
    color: "#229ED9",
  },
  {
    value: "facebook",
    label: "Facebook",
    icon: Users,
    color: "#1877F2",
  },
  {
    value: "tiktok",
    label: "TikTok",
    icon: Video,
    color: "#000000",
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: Camera,
    color: "#E4405F",
  },
  {
    value: "twitter",
    label: "Twitter / X",
    icon: AtSign,
    color: "#111827",
  },
  {
    value: "youtube",
    label: "YouTube",
    icon: Play,
    color: "#FF0000",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: Briefcase,
    color: "#0A66C2",
  },
  {
    value: "website",
    label: "Website / Other",
    icon: Globe,
    color: "#475569",
  },
];

const SectionHeader = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-[#fcfafb] flex items-center justify-center shrink-0">
        <Icon size={19} className="text-slate-700" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>

        {description && (
          <p className="text-xs text-slate-500 mt-1 leading-5">{description}</p>
        )}
      </div>
    </div>
  );
};

const FormField = ({
  label,
  error,
  required = false,
  children,
  className = "",
}) => {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-700 mb-2">
        {label}

        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {children}

      {error && <p className="text-xs text-red-500 mt-1.5">{error.message}</p>}
    </div>
  );
};

const inputClass =
  "w-full h-10 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#870d4c] focus:ring-2 focus:ring-[#870d4c]/30/10";

const textareaClass =
  "w-full min-h-[96px] rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none transition focus:border-[#870d4c] focus:ring-2 focus:ring-[#870d4c]/30/10";



const GeneralSettings = () => {
  const { t } = useTranslation();

  const {
    register,
    control,
    errors,
    fields,
    append,
    remove,
    watch,
    handleSubmit,
    onSubmit,
    handleCancel,
    handleLogoChange,
    handleQrUploadChange,
    handleSupportChange,
    handleClearLogo,
    handleClearQr,
    handleClearSupport,
    logoPreview,
    qrPreview,
    qrFileName,
    supportFileName,
    isSubmitting,
  } = useGeneralSetting();

  const socialMedia = watch("social_media");

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-5 sm:px-6 py-5 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#9d1159] flex items-center justify-center">
                  <Store size={20} className="text-white" />
                </div>

                <div>
                  <h1 className="text-base font-bold text-slate-900">
                    {t("settings.generalSettings", "General Settings")}
                  </h1>

                  <p className="text-xs text-slate-500 mt-1">
                    {t(
                      "settings.generalDesc",
                      "Manage your shop information and branding.",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="h-9 px-3.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 transition disabled:opacity-50 flex items-center gap-2"
                >
                  <RotateCcw size={15} />

                  {t("common.cancel", "Cancel")}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-9 px-4 rounded-lg bg-[#9d1159] text-white text-xs font-semibold hover:bg-[#9d1159] transition disabled:opacity-50 flex items-center gap-2"
                >
                  <Save size={15} />

                  {isSubmitting
                    ? t("common.saving", "Saving...")
                    : t("settings.saveChanges", "Save Changes")}
                </button>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
              <div className="xl:col-span-8 space-y-5">
                <section className="border border-slate-200 rounded-2xl p-5">
                  <SectionHeader
                    icon={Store}
                    title={t("settings.shopIdentity", "Shop Identity")}
                    description={t(
                      "settings.shopIdentityDesc",
                      "Configure the basic information displayed across your shop.",
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      label={t("settings.shopName", "Shop Name")}
                      required
                      error={errors.shop_name}
                    >
                      <input
                        type="text"
                        placeholder={t(
                          "settings.shopNamePlaceholder",
                          "Enter shop name",
                        )}
                        className={inputClass}
                        {...register("shop_name")}
                      />
                    </FormField>

                    {/*
                    <FormField
                      label={t("settings.shopCode", "Shop Code")}
                      error={errors.shop_code}
                    >
                      <input
                        type="text"
                        readOnly
                        className={`${inputClass} bg-[#fcfafb] text-slate-500 cursor-not-allowed`}
                        {...register("shop_code")}
                      />
                    </FormField>
                    */}

                    <FormField
                      label={t("settings.supportPhone", "Support Phone")}
                      error={errors.phone}
                    >
                      <input
                        type="text"
                        placeholder={t(
                          "settings.phonePlaceholder",
                          "+855 12 345 678",
                        )}
                        className={inputClass}
                        {...register("phone")}
                      />
                    </FormField>

                    <FormField
                      label={t("settings.telegramChatId", "Telegram Chat ID")}
                      error={errors.chat_id}
                    >
                      <input
                        type="text"
                        placeholder={t(
                          "settings.telegramChatIdPlaceholder",
                          "Enter Telegram chat ID",
                        )}
                        className={inputClass}
                        {...register("chat_id")}
                      />
                    </FormField>

                    <FormField
                      label={t("settings.address", "Address")}
                      error={errors.address}
                      className="md:col-span-2"
                    >
                      <div className="relative">
                        <MapPin
                          size={16}
                          className="absolute left-3 top-3 text-slate-400"
                        />

                        <textarea
                          placeholder={t(
                            "settings.addressDetailedPlaceholder",
                            "Enter your shop address",
                          )}
                          className={`${textareaClass} pl-9`}
                          {...register("address")}
                        />
                      </div>
                    </FormField>

                    <FormField
                      label={t("settings.bioShop", "Shop Bio")}
                      error={errors.bio_shop}
                      className="md:col-span-2"
                    >
                      <textarea
                        placeholder={t(
                          "settings.bioShopPlaceholder",
                          "Write a short description about your shop",
                        )}
                        className={textareaClass}
                        {...register("bio_shop")}
                      />
                    </FormField>
                  </div>
                </section>

                <section className="border border-slate-200 rounded-2xl p-5">
                  <SectionHeader
                    icon={LinkIcon}
                    title={t("settings.socialMedia", "Social Media")}
                    description={t(
                      "settings.socialMediaDesc",
                      "Manage the social media links displayed on your storefront.",
                    )}
                  />

                  <div className="space-y-3">
                    {fields.length > 0 ? (
                      fields.map((field, index) => {
                        const currentName =
                          socialMedia?.[index]?.title?.trim() || "";

                        const currentIcon = socialMedia?.[index]?.icon || "";

                        const matchedByIcon = socialIconOptions.find(
                          (option) => option.value === currentIcon,
                        );

                        const matchedByName = socialIconOptions.find(
                          (option) =>
                            option.label.toLowerCase() ===
                            currentName.toLowerCase(),
                        );

                        const selectedOption =
                          matchedByIcon ||
                          matchedByName ||
                          socialIconOptions.find(
                            (option) => option.value === "website",
                          );

                        const Icon = selectedOption.icon;

                        return (
                          <div
                            key={field.id}
                            className="group rounded-xl border border-slate-200 bg-white p-3 hover:border-slate-300 hover:shadow-sm transition-all"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-[48px_minmax(150px,0.8fr)_minmax(240px,1.5fr)_40px] gap-3 items-end">
                              <Controller
                                name={`social_media.${index}.icon`}
                                control={control}
                                render={({ field: selectField }) => (
                                  <div>
                                    <label className="block text-[10px] font-semibold text-slate-500 mb-2">
                                      {t("settings.icon", "Icon")}
                                    </label>

                                    <Select
                                      value={
                                        socialIconOptions.find(
                                          (option) =>
                                            option.value === selectField.value,
                                        ) || null
                                      }
                                      onChange={(option) =>
                                        selectField.onChange(
                                          option?.value || "",
                                        )
                                      }
                                      options={socialIconOptions}
                                      isSearchable={false}
                                      isClearable
                                      placeholder="—"
                                      className="text-sm"
                                      styles={{
                                        control: (base, state) => ({
                                          ...base,
                                          minHeight: "40px",
                                          height: "40px",
                                          width: "48px",
                                          borderRadius: "10px",
                                          borderColor: state.isFocused
                                            ? "#3b82f6"
                                            : "#e2e8f0",
                                          boxShadow: state.isFocused
                                            ? "0 0 0 2px rgba(59,130,246,.08)"
                                            : "none",
                                          cursor: "pointer",
                                        }),

                                        valueContainer: (base) => ({
                                          ...base,
                                          padding: "0 8px",
                                          justifyContent: "center",
                                        }),

                                        indicatorsContainer: (base) => ({
                                          ...base,
                                          display: "none",
                                        }),

                                        singleValue: (base) => ({
                                          ...base,
                                          margin: 0,
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }),

                                        menu: (base) => ({
                                          ...base,
                                          width: "190px",
                                          zIndex: 50,
                                        }),

                                        option: (base, state) => ({
                                          ...base,
                                          backgroundColor: state.isFocused
                                            ? "#f8fafc"
                                            : "white",
                                          color: "#334155",
                                          cursor: "pointer",
                                        }),
                                      }}

                                      formatOptionLabel={(
                                        option,
                                        { context },
                                      ) => {
                                        const OptionIcon = option.icon;

                                        if (context === "value") {
                                          return (
                                            <OptionIcon
                                              size={17}
                                              style={{
                                                color: option.color,
                                              }}
                                            />
                                          );
                                        }

                                        return (
                                          <div className="flex items-center gap-2">
                                            <OptionIcon
                                              size={15}
                                              style={{
                                                color: option.color,
                                              }}
                                            />

                                            <span className="text-xs">
                                              {option.label}
                                            </span>
                                          </div>
                                        );
                                      }}
                                    />
                                  </div>
                                )}
                              />

                              <FormField
                                label={t(
                                  "settings.socialMediaName",
                                  "Social Media Name",
                                )}
                                error={errors.social_media?.[index]?.title}
                              >
                                <input
                                  type="text"
                                  placeholder={t(
                                    "settings.socialMediaNamePlaceholder",
                                    "Facebook",
                                  )}
                                  className={`${inputClass} font-medium`}
                                  {...register(`social_media.${index}.title`)}
                                />
                              </FormField>

                              <FormField
                                label={t("settings.socialMediaUrl", "URL")}
                                error={errors.social_media?.[index]?.url}
                              >
                                <div className="relative">
                                  <LinkIcon
                                    size={14}
                                    className="absolute left-3 top-3 text-slate-400"
                                  />

                                  <input
                                    type="url"
                                    placeholder={t(
                                      "settings.socialMediaPlaceholder",
                                      "https://chomnenhdigita.com",
                                    )}
                                    className={`${inputClass} pl-9`}
                                    {...register(`social_media.${index}.url`)}
                                  />
                                </div>
                              </FormField>

                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="h-10 w-10 rounded-xl border border-slate-200 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition flex items-center justify-center"
                                title={t("common.delete", "Delete")}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>

                            {currentName && (
                              <div className="mt-2 ml-0 md:ml-[60px] flex items-center gap-2">
                                <Icon
                                  size={13}
                                  style={{
                                    color: selectedOption.color,
                                  }}
                                />

                                <span className="text-[10px] text-slate-400">
                                  {selectedOption.label !== currentName
                                    ? selectedOption.label
                                    : currentName}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="border border-dashed border-slate-300 rounded-xl py-9 text-center">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-[#fcfafb] flex items-center justify-center mb-3">
                          <Globe size={19} className="text-slate-300" />
                        </div>

                        <p className="text-xs font-medium text-slate-500">
                          {t(
                            "settings.noSocialMedia",
                            "No social media links added yet.",
                          )}
                        </p>

                        <p className="text-[10px] text-slate-400 mt-1">
                          {t(
                            "settings.addSocialMediaHint",
                            "Add your social media name and URL below.",
                          )}
                        </p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        append({
                          icon: "",
                          title: "",
                          url: "",
                        })
                      }
                      className="w-full h-10 rounded-xl border border-dashed border-slate-300 text-xs font-semibold text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition flex items-center justify-center gap-2"
                    >
                      <Plus size={15} />

                      {t("settings.addSocialMedia", "Add Social Media")}
                    </button>
                  </div>
                </section>
              </div>

              <div className="xl:col-span-4 space-y-5">
                <section className="border border-slate-200 rounded-2xl p-5">
                  <SectionHeader
                    icon={ImageIcon}
                    title={t("settings.shopLogo", "Shop Logo")}
                    description={t(
                      "settings.uploadLogo",
                      "Upload your shop logo.",
                    )}
                  />

                  <div className="flex flex-col items-center">
                    <div className="relative group w-40 h-40 rounded-2xl border border-slate-200 bg-[#fcfafb] overflow-hidden">
                      {logoPreview ? (
                        <>
                          <img
                            src={logoPreview}
                            alt="Shop Logo"
                            className="w-full h-full object-contain p-4 bg-white"
                          />

                          <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                              <Upload size={17} className="text-white" />
                            </div>

                            <span className="text-xs font-semibold text-white">
                              {t("settings.change", "Change")}
                            </span>
                          </div>
                        </>
                      ) : (
                        <label
                          htmlFor="logo-upload"
                          className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                        >
                          <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-3">
                            <ImageIcon size={20} className="text-slate-400" />
                          </div>

                          <span className="text-xs font-semibold text-slate-600">
                            {t("settings.uploadLogo", "Upload Logo")}
                          </span>

                          <span className="text-[10px] text-slate-400 mt-1">
                            PNG, JPG, WEBP
                          </span>
                        </label>
                      )}

                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={handleLogoChange}
                      />

                      {logoPreview && (
                        <label
                          htmlFor="logo-upload"
                          className="absolute inset-0 cursor-pointer"
                        />
                      )}
                    </div>

                    {logoPreview && (
                      <button
                        type="button"
                        onClick={handleClearLogo}
                        className="mt-3 text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                      >
                        <X size={13} />

                        {t("common.delete", "Remove")}
                      </button>
                    )}
                  </div>
                </section>

                <section className="border border-slate-200 rounded-2xl p-5">
                  <SectionHeader
                    icon={QrCode}
                    title={t("settings.qrUpload", "QR Code")}
                    description={t(
                      "settings.qrUploadDesc",
                      "Upload a QR code image for your customers.",
                    )}
                  />

                  <div className="flex flex-col items-center">
                    <div className="relative group w-48 h-48 rounded-2xl border border-dashed border-slate-300 bg-[#fcfafb] overflow-hidden">
                      {qrPreview ? (
                        <>
                          <img
                            src={qrPreview}
                            alt="QR Code Preview"
                            className="w-full h-full object-contain p-4 bg-white"
                          />

                          <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                              <Upload size={17} className="text-white" />
                            </div>

                            <span className="text-xs font-semibold text-white">
                              {t("settings.change", "Change")}
                            </span>
                          </div>
                        </>
                      ) : (
                        <label
                          htmlFor="qr-upload"
                          className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-3">
                            <QrCode size={24} className="text-slate-400" />
                          </div>

                          <span className="text-xs font-semibold text-slate-600">
                            {t("settings.uploadQr", "Upload QR Code")}
                          </span>

                          <span className="text-[10px] text-slate-400 mt-1">
                            PNG, JPG, WEBP
                          </span>
                        </label>
                      )}

                      <input
                        id="qr-upload"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={handleQrUploadChange}
                      />

                      {qrPreview && (
                        <label
                          htmlFor="qr-upload"
                          className="absolute inset-0 cursor-pointer"
                        />
                      )}
                    </div>

                    {qrFileName && (
                      <div className="w-full mt-3 flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#fcfafb] border border-slate-200">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText
                            size={14}
                            className="text-slate-400 shrink-0"
                          />

                          <span className="text-xs text-slate-600 truncate">
                            {qrFileName}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handleClearQr}
                          className="text-slate-400 hover:text-red-500 transition shrink-0"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </section>

                <section className="border border-slate-200 rounded-2xl p-5">
                  <SectionHeader
                    icon={MessageCircle}
                    title={t("settings.supportDocument", "Support Document")}
                    description={t(
                      "settings.supportDocumentDesc",
                      "Upload a document used for customer support.",
                    )}
                  />

                  <div className="relative">
                    <input
                      id="support-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleSupportChange}
                    />

                    <label
                      htmlFor="support-upload"
                      className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-slate-300 bg-[#fcfafb] hover:bg-slate-100 transition cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <FileText size={18} className="text-slate-500" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-700 truncate">
                          {supportFileName ||
                            t(
                              "settings.selectSupportDocument",
                              "Select Support Document",
                            )}
                        </p>

                        <p className="text-[10px] text-slate-400 mt-1">
                          PDF, DOC, DOCX
                        </p>
                      </div>

                      <Upload size={16} className="text-slate-400 shrink-0" />
                    </label>

                    {supportFileName && (
                      <button
                        type="button"
                        onClick={handleClearSupport}
                        className="absolute right-2 top-2 w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 transition"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;
