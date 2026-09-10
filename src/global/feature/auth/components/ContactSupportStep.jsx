import React from "react";
import { UploadCloud, Plus, Trash2, FileText } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const ContactSupportStep = ({
  register,
  errors,
  control,
  setValue,
  watch,
}) => {
  const { t } = useTranslation();
  const support = watch("support");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "social_media",
  });

  const supportFileName =
    support?.[0] instanceof File ? support[0].name : null;

  const handleSupportChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setValue("support", [file], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue("support", undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Address Section */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {t('auth.address')}
          <span className="text-gray-400 font-normal"> (Optional)</span>
        </label>

        <textarea
          {...register("address")}
          placeholder="Shop Address"
          rows={2}
          className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
        />

        {errors.address && (
          <span className="text-[11px] text-red-600 mt-0.5 block">
            {t(errors.address.message)}
          </span>
        )}
      </div>

      {/* Support Document Section */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {t('auth.supportDocument')}
          <span className="text-gray-400 font-normal"> (Optional)</span>
        </label>

        <div className="relative">
          <input
            type="file"
            className="hidden"
            id="support-upload"
            accept=".pdf,image/*"
            onChange={handleSupportChange}
          />

          <label
            htmlFor="support-upload"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-dashed border-gray-300 bg-gray-50 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-blue-300 transition-colors text-sm font-medium"
          >
            {supportFileName ? (
              <>
                <FileText size={18} className="text-blue-500" />
                <span className="text-blue-700 font-semibold">
                  {supportFileName}
                </span>
              </>
            ) : (
              <>
                <UploadCloud size={18} />
                <span>{t('auth.uploadPdf')}</span>
              </>
            )}
          </label>
        </div>

        {errors.support && (
          <span className="text-[11px] text-red-600 mt-0.5 block">
            {t(errors.support.message)}
          </span>
        )}
      </div>

      {/* Social Media Section */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-gray-700">
            {t('auth.socialMedia')}
            <span className="text-gray-400 font-normal"> (Optional)</span>
          </label>

          <button
            type="button"
            onClick={() => append({ platform: "", url: "" })}
            className="text-[11px] font-medium text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors"
          >
            <Plus size={12} />
            {t('auth.add')}
          </button>
        </div>

        {/* Only show fields when there are social media entries */}
        {fields.length > 0 && (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-2 items-start"
              >
                <div className="flex-grow space-y-2">
                  {/* Platform Input */}
                  <input
                    {...register(`social_media.${index}.platform`)}
                    placeholder="Platform (e.g., Facebook, Telegram)"
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-xs"
                  />

                  {errors.social_media?.[index]?.platform && (
                    <span className="text-[10px] text-red-600 block">
                      {t(errors.social_media[index].platform.message)}
                    </span>
                  )}

                  {/* URL Input */}
                  <input
                    {...register(`social_media.${index}.url`)}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-xs"
                  />

                  {errors.social_media?.[index]?.url && (
                    <span className="text-[10px] text-red-600 block">
                      {t(errors.social_media[index].url.message)}
                    </span>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-0.5"
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSupportStep;