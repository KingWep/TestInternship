import React, { useEffect, useState } from "react";
import { Save, Image as ImageIcon, Upload } from "lucide-react";
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
      image: "", // Can be a URL string or File object depending on your backend
      description: "",
    },
  });

  const [previewImage, setPreviewImage] = useState(null);
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        slug: initialData.slug || "",
        image: initialData.image || "",
        description: initialData.description || "",
      });
      // If initialData has an existing image URL/path, show it in preview
      if (initialData.image) {
        setPreviewImage(initialData.image);
      }
    } else {
      reset({
        name: "",
        slug: "",
        image: "",
        description: "",
      });
      setPreviewImage(null);
    }
  }, [initialData, reset]);

  // Auto-generate slug from name
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

  // Handle file selection change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      // Create local temporary URL for instant preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

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

      {/* File Input & Preview */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          រូបភាព (ICON / Image File)
        </label>
        <div className="flex items-center gap-3">
          <label className="flex-1 flex items-center gap-2 px-3 py-2 text-sm bg-gray-50 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition">
            <Upload size={16} className="text-gray-500" />
            <span className="text-gray-500 truncate">
              {watch("image")?.name ? watch("image").name : "ជ្រើសរើសរូបភាព..."}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Live Preview Box */}
          <div className="w-12 h-12 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon size={20} className="text-gray-400" />
            )}
          </div>
        </div>
        {errors.image && (
          <p className="text-xs text-red-500 mt-1">
            {errors.image.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
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