import { z } from "zod";

export const slideSchema = z.object({
  tag: z
    .string()
    .max(50, "Tag មិនអាចលើស 50 តួអក្សរ")
    .optional(),

  title: z
    .string()
    .min(1, "សូមបញ្ចូលចំណងជើង")
    .max(100, "ចំណងជើងមិនអាចលើស 100 តួអក្សរ"),

  description: z
    .string()
    .max(300, "ការពិពណ៌នាមិនអាចលើស 300 តួអក្សរ")
    .optional(),

  discountPercentage: z
    .coerce
    .number()
    .min(0, "ភាគរយមិនអាចតិចជាង 0")
    .max(100, "ភាគរយមិនអាចលើស 100")
    .optional(),

  ctaText: z
    .string()
    .max(30, "អត្ថបទប៊ូតុងមិនអាចលើស 30 តួអក្សរ")
    .optional(),

  backgroundColor: z
    .string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      "សូមបញ្ចូលពណ៌ HEX ត្រឹមត្រូវ"
    ),

  status: z.enum(["Active", "Inactive"]),
});