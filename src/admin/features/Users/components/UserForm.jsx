import React, { useEffect } from "react";
import { Save } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";

export default function UserForm({ onSubmit, initialData }) {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "User",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    reset({
      name: initialData?.name || "",
      email: initialData?.email ,
      role: initialData?.role || "User",
      password: "",
      confirmPassword: "",
    });
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          ឈ្មោះ <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          {...register("name")}
          placeholder="ឧទាហរណ៍: សុខ សាន្ត"
          className={`w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 ${
            errors.name
              ? "ring-2 ring-red-400 focus:ring-red-500"
              : "focus:ring-gray-200"
          }`}
        />

        {errors.name && (
          <p className="mt-1 text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            អ៊ីមែល <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            {...register("email")}
            placeholder="ឧទាហរណ៍: user@gmail.com"
            className={`w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 ${
              errors.email
                ? "ring-2 ring-red-400 focus:ring-red-500"
                : "focus:ring-gray-200"
            }`}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            តួនាទី <span className="text-red-500">*</span>
          </label>

          <select
            {...register("role")}
            className={`w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 ${
              errors.role
                ? "ring-2 ring-red-400 focus:ring-red-500"
                : "focus:ring-gray-200"
            }`}
          >
            <option value="Admin">អ្នកគ្រប់គ្រង (Admin)</option>
            <option value="User">អ្នកប្រើប្រាស់ (User)</option>
          </select>

          {errors.role && (
            <p className="mt-1 text-xs text-red-500">
              {errors.role.message}
            </p>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              ពាក្យសម្ងាត់ <span className="text-red-500">*</span>
            </label>

            <input
              type="password"
              {...register("password")}
              placeholder="យ៉ាងហោចណាស់ 6 តួអក្សរ"
              className={`w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 ${
                errors.password
                  ? "ring-2 ring-red-400 focus:ring-red-500"
                  : "focus:ring-gray-200"
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              បញ្ជាក់ពាក្យសម្ងាត់{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="បញ្ចូលពាក្យសម្ងាត់ម្ដងទៀត"
              className={`w-full px-3 py-2 text-sm bg-gray-50 rounded-lg outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "ring-2 ring-red-400 focus:ring-red-500"
                  : "focus:ring-gray-200"
              }`}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={16} />

          {isSubmitting
            ? "កំពុងរក្សាទុក..."
            : isEditing
              ? "ធ្វើបច្ចុប្បន្នភាពអ្នកប្រើប្រាស់"
              : "រក្សាទុកអ្នកប្រើប្រាស់"}
        </button>
      </div>
    </form>
  );
}