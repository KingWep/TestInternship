import { z } from "zod";

export const slideSchema = z.object({
  tag: z
    .string()
    .max(50, "validation.tagMaxLength")
    .optional(),

  title: z
    .string()
    .min(1, "validation.requiredTitle")
    .max(100, "validation.titleMaxLength"),

  description: z
    .string()
    .max(300, "validation.descriptionMaxLength")
    .optional(),

  discountPercentage: z
    .coerce
    .number()
    .min(0, "validation.percentMin")
    .max(100, "validation.percentMax")
    .optional(),

  ctaText: z
    .string()
    .max(30, "validation.buttonTextMaxLength")
    .optional(),

  backgroundColor: z
    .string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      "validation.invalidHex"
    ),

  shop_code: z
    .string()
    .max(50, "validation.shopCodeMaxLength")
    .optional(),

  status: z.enum(["Active", "Inactive"]),
});