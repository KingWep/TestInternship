import { z } from "zod";
export const userSchema = z.object({
  name: z
  .string()
  .min(1, "សូមបញ្ចូលឈ្មោះ")
  .max(100, "ឈ្មោះមិនអាចលើស 100 តួអក្សរ"),
  email: z
  .string()
  .min(1, "សូមបញ្ចូល Username ឬ អ៊ីមែល")
  .max(100, "username ឬ អ៊ីមែលមិនអាចលើស 100 តួអក្សរ"),
  role: z
  .enum(["Admin", "User"], "សូមជ្រើសរើសតួនាទី"),
  password: z
  .string()
  .min(6, "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ 6 តួអក្សរ")
  .max(100, "ពាក្យសម្ងាត់មិនអាចលើស 100 តួអក្សរ"),
  confirmPassword: z
  .string()
  .min(6, "  សូមបញ្ជាក់ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ 6 តួអក្សរ")
  .max(100, "សូមបញ្ជាក់ពាក្យសម្ងាត់មិនអាចលើស 100 តួអក្សរ"),   
}).refine((data) => data.password === data.confirmPassword, {
  message: "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ (Passwords do not match)"
});