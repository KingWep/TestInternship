import React, { useEffect } from "react";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { slideSchema } from "../schemas/slideSchema";

export default function SlideForm({ onSubmit, initialData }) {
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
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ស្លាក
          </label>

          <input
            type="text"
            {...register("tag")}
            placeholder="ឧទាហរណ៍: ទំនិញថ្មី"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />

          {errors.tag && (
            <p className="text-xs text-red-500 mt-1">
              {errors.tag.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ចំណងជើង <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            {...register("title")}
            placeholder="ឧទាហរណ៍: ការប្រមូលរដូវក្តៅ"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />

          {errors.title && (
            <p className="text-xs text-red-500 mt-1">
              {errors.title.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ភាគរយបញ្ចុះតម្លៃ (%)
          </label>

          <input
            type="number"
            min="0"
            max="100"
            {...register("discountPercentage", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
            placeholder="ឧទាហរណ៍: 25"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />

          {errors.discountPercentage && (
            <p className="text-xs text-red-500 mt-1">
              {errors.discountPercentage.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ស្ថានភាព
          </label>

          <select
            {...register("status")}
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="Active">សកម្ម</option>
            <option value="Inactive">អសកម្ម</option>
          </select>

          {errors.status && (
            <p className="text-xs text-red-500 mt-1">
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            អត្ថបទប៊ូតុង CTA
          </label>

          <input
            type="text"
            {...register("ctaText")}
            placeholder="ឧទាហរណ៍: ទិញឥឡូវនេះ"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />

          {errors.ctaText && (
            <p className="text-xs text-red-500 mt-1">
              {errors.ctaText.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ពណ៌ផ្ទៃខាងក្រោយ
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
              {errors.backgroundColor.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          ការពិពណ៌នា
        </label>

        <textarea
          {...register("description")}
          rows={3}
          placeholder="ការពិពណ៌នាស្លាយ..."
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none resize-none focus:ring-2 focus:ring-gray-200"
        />

        {errors.description && (
          <p className="text-xs text-red-500 mt-1">
            {errors.description.message}
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
            ? "ធ្វើបច្ចុប្បន្នភាពស្លាយ"
            : "រក្សាទុកស្លាយ"}
        </button>
      </div>
    </form>
  );
}