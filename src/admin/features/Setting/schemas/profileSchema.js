import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "សូមបញ្ចូលឈ្មោះ"),
  email: z.string().email("សូមបញ្ចូលអ៊ីមែលអោយបានត្រឹមត្រូវ"),
  password: z.string().optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine((data) => {
  if (data.password && data.password !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "លេខសម្ងាត់មិនផ្ទៀងផ្ទាត់ទេ",
  path: ["confirmPassword"],
});
