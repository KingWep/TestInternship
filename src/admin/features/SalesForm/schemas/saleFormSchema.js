import { z } from "zod";

export const saleFormSchema = z.object({
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, '')) // Remove spaces just in case
    .transform((val) => val.startsWith('0') ? val.slice(1) : val) // Remove leading 0 if any
    .refine((val) => /^\d{8,9}$/.test(val), "សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ (8-9 ខ្ទង់)")
    .transform((val) => `+855${val}`), // Transform to E.164 format

  address: z
    .string()
    .trim()
    .min(2, "សូមបញ្ចូលអាសយដ្ឋាន"),

  deliveryFee: z
    .coerce
    .number()
    .min(0, "សេវាដឹកជញ្ជូនមិនអាចអវិជ្ជមានបានទេ")
    .optional(),
});