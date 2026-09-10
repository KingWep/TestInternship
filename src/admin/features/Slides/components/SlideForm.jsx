import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { slideSchema } from "../schemas/slideSchema";

export default function SlideForm({ onSubmit, initialData }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(slideSchema),
    defaultValues: {
      tag: "",
      title: "",
      description: "",
      discountPercentage: "",
      ctaText: "",
      backgroundColor: "#FF5733",
      status: "Active",
      shop_code: "",
    },
  });

  const isEditing = !!initialData;
  const backgroundColor = watch("backgroundColor");

  useEffect(() => {
    reset({
      tag: initialData?.tag || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      discountPercentage: initialData?.discountPercentage ?? "",
      ctaText: initialData?.ctaText || "",
      backgroundColor: initialData?.backgroundColor || "#FF5733",
      status: initialData?.status || "Active",
      shop_code: initialData?.shop_code || "",
    });
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-5"
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t('slides.badge')}
          </label>

          <input
            type="text"
            {...register("tag")}
            placeholder={t('slides.badgePlaceholder')}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />

          {errors.tag && (
            <p className="text-xs text-red-500 mt-1">
              {errors.tag?.message ? t(errors.tag.message) : ""}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t('slides.titleLabel')} <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            {...register("title")}
            placeholder={t('slides.titlePlaceholder')}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />

          {errors.title && (
            <p className="text-xs text-red-500 mt-1">
              {errors.title?.message ? t(errors.title.message) : ""}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t('slides.discount')}
          </label>

          <input
            type="number"
            min="0"
            max="100"
            {...register("discountPercentage", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
            placeholder={t('slides.discountPlaceholder')}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />

          {errors.discountPercentage && (
            <p className="text-xs text-red-500 mt-1">
              {errors.discountPercentage?.message ? t(errors.discountPercentage.message) : ""}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t('slides.status')}
          </label>

          <select
            {...register("status")}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="Active">{t('slides.active')}</option>
            <option value="Inactive">{t('slides.inactive')}</option>
          </select>

          {errors.status && (
            <p className="text-xs text-red-500 mt-1">
              {errors.status?.message ? t(errors.status.message) : ""}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t('slides.ctaLabel')}
          </label>

          <input
            type="text"
            {...register("ctaText")}
            placeholder={t('slides.ctaPlaceholder')}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />

          {errors.ctaText && (
            <p className="text-xs text-red-500 mt-1">
              {errors.ctaText?.message ? t(errors.ctaText.message) : ""}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t('slides.bgColorLabel')}
          </label>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={backgroundColor || "#FF5733"}
              onChange={(e) =>
                setValue("backgroundColor", e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className="w-10 h-10 p-1 bg-gray-50 rounded-lg outline-none cursor-pointer"
            />

            <input
              type="text"
              {...register("backgroundColor")}
              placeholder="#FF5733"
              className="flex-1 px-3 py-2 text-sm uppercase bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {errors.backgroundColor && (
            <p className="text-xs text-red-500 mt-1">
              {errors.backgroundColor?.message ? t(errors.backgroundColor.message) : ""}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">
          {t('slides.shopCodeLabel')}
        </label>

        <input
          type="text"
          {...register("shop_code")}
          placeholder={t('slides.shopCodePlaceholder')}
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
        />

        {errors.shop_code && (
          <p className="text-xs text-red-500 mt-1">
            {errors.shop_code?.message ? t(errors.shop_code.message) : ""}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">
          {t('slides.descriptionLabel')}
        </label>

        <textarea
          {...register("description")}
          rows={3}
          placeholder={t('slides.descPlaceholder')}
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none resize-none focus:ring-2 focus:ring-gray-200"
        />

        {errors.description && (
          <p className="text-xs text-red-500 mt-1">
            {errors.description?.message ? t(errors.description.message) : ""}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Save size={16} />
          {isEditing
            ? t('slides.updateBtn')
            : t('slides.saveBtn')}
        </button>
      </div>
    </form>
  );
}