import React, { useEffect } from "react";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../schemas/categorySchema";

export default function CategoryForm({ onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  // Edit
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
      });
    } else {
      reset({
        name: "",
        slug: "",
        description: "",
      });
    }
  }, [initialData, reset]);

  const name = watch("name");
  useEffect(() => {
    if (!isEditing && name) {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      setValue("slug", slug, {
        shouldValidate: true,
      });
    }
  }, [name, isEditing, setValue]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Name & Slug */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ឈ្មោះប្រភេទ {!isEditing && "*"}
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Category Name"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Slug {!isEditing && "*"}
          </label>
          <input
            type="text"
            {...register("slug")}
            placeholder="ឧទាហរណ៍: skincare"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
          {errors.slug && (
            <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          ការពិពណ៌នា
        </label>
        <textarea
          {...register("description")}
          rows="3"
          placeholder="ការពិពណ៌នាប្រភេទ..."
          className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none resize-none focus:ring-2 focus:ring-gray-200"
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Save size={16} />
          {isEditing ? "ធ្វើបច្ចុប្បន្នភាពប្រភេទ" : "រក្សាទុកប្រភេទ"}
        </button>
      </div>
    </form>
  );
}
