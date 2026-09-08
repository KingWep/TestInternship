import React, { useEffect, useState } from "react";
import { Save, Image as ImageIcon, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliveryProviderSchema } from "../schemas/delivery_providerSchema";

export default function DeliveryProviderForm({ onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(deliveryProviderSchema),
    defaultValues: {
      name: "",
      phone: "",
      shipping_fee: "",
      logo: "",
      is_active: 1,
    },
  });

  const [previewImage, setPreviewImage] = useState(null);
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        phone: initialData.phone || "",
        shipping_fee: initialData.shipping_fee || "",
        logo: initialData.logo || "",
        is_active: initialData.is_active === undefined ? 1 : initialData.is_active,
      });
      if (initialData.logo) {
        setPreviewImage(initialData.logo);
      }
    } else {
      reset({
        name: "",
        phone: "",
        shipping_fee: "",
        logo: "",
        is_active: 1,
      });
      setPreviewImage(null);
    }
  }, [initialData, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("logo", file, { shouldValidate: true });
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ឈ្មោះអ្នកដឹកជញ្ជូន *
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="J&T, Vireak Buntham..."
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            លេខទូរស័ព្ទ *
          </label>
          <input
            type="text"
            {...register("phone")}
            placeholder="012345678"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            តម្លៃសេវាដឹក (Shipping Fee) *
          </label>
          <input
            type="number"
            step="0.01"
            {...register("shipping_fee")}
            placeholder="2.50"
            className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          />
          {errors.shipping_fee && (
            <p className="text-xs text-red-500 mt-1">
              {errors.shipping_fee.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            ស្ថានភាព
          </label>
          <div className="flex items-center h-full pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!!watch("is_active")}
                onChange={(e) => setValue("is_active", e.target.checked ? 1 : 0)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {watch("is_active") ? "ដំណើរការ (Active)" : "ផ្អាក (Inactive)"}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          រូបភាព Logo
        </label>
        <div className="flex items-center gap-3">
          <label className="flex-1 flex items-center gap-2 px-3 py-2 text-sm bg-gray-50 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition">
            <Upload size={16} className="text-gray-500" />
            <span className="text-gray-500 truncate">
              {watch("logo")?.name ? watch("logo").name : "ជ្រើសរើសរូបភាព..."}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

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
        {errors.logo && (
          <p className="text-xs text-red-500 mt-1">
            {errors.logo.message}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Save size={16} />
          {isEditing ? "ធ្វើបច្ចុប្បន្នភាព" : "រក្សាទុក"}
        </button>
      </div>
    </form>
  );
}
