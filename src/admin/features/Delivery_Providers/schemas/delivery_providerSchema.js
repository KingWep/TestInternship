import { z } from "zod";

export const deliveryProviderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "ឈ្មោះអ្នកដឹកជញ្ជូនមិនអាចទទេបានទេ (Provider name is required)." }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "លេខទូរស័ព្ទមិនអាចទទេបានទេ (Phone is required)." }),
  shipping_fee: z
    .any()
    .refine((val) => val !== "" && val !== null && val !== undefined, { message: "តម្លៃសេវាមិនអាចទទេបានទេ (Shipping fee is required)." }),
  is_active: z.union([z.boolean(), z.number(), z.string()]).optional(),
  logo: z.any().optional(),
});
