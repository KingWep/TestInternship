import { z } from "zod";

export const orderUpdateSchema = z.object({
  customerPhone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, '')) // Remove spaces
    .transform((val) => val.startsWith('0') ? val.slice(1) : val) // Remove leading 0
    .refine((val) => /^\d{8,9}$/.test(val), "សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ (8-9 ខ្ទង់)")
    .transform((val) => `+855${val}`),

  status: z.string().min(1, "សូមជ្រើសរើសស្ថានភាព"),

  paymentStatus: z.string().min(1, "សូមជ្រើសរើសស្ថានភាពទូទាត់"),

  customerAddress: z
    .string()
    .trim()
    .min(2, "សូមបញ្ចូលអាសយដ្ឋាន"),

  deliveryFee: z.coerce
    .number()
    .min(0, "សេវាដឹកជញ្ជូនមិនអាចតិចជាង 0 បាន"),

  items: z
    .array(
      z.object({
        productId: z.coerce.number().positive("សូមជ្រើសរើសទំនិញ"),
        quantity: z.coerce
          .number()
          .int()
          .min(1, "ចំនួនត្រូវយ៉ាងហោចណាស់ 1"),
        price: z.coerce.number().min(0),
      })
    )
    .min(1, "សូមបន្ថែមទំនិញយ៉ាងហោចណាស់ 1 មុខ"),
});