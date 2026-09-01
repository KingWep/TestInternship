import { z } from "zod";

export const clientOrderSchema = z.object({
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, '')) // Remove spaces
    .transform((val) => val.startsWith('0') ? val.slice(1) : val) // Remove leading 0
    .refine((val) => /^\d{8,9}$/.test(val), "សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ (8-9 ខ្ទង់)"),
  address: z
    .string()
    .trim()
    .min(2, "សូមបញ្ចូលអាសយដ្ឋាន"),
  deliveryMethod: z
    .string()
    .min(1, "សូមជ្រើសរើសសេវាដឹកជញ្ជូន"),
  paymentMethod: z
    .string()
    .min(1, "សូមជ្រើសរើសវិធីបង់ប្រាក់"),
});
