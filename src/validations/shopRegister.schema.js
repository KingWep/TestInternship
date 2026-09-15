import * as z from "zod";
import { emailRule } from "./common/email";
import { passwordRule } from "./common/password";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const accountSetupSchema = (t) => z.object({
  name: z.string().min(2, {
    message: t("auth.nameMinLength") || "Name must be at least 2 characters.",
  }),

  email: emailRule(t),

  password: passwordRule(t),

  phone: z.string().min(8, {
    message: t("validation.requiredPhone") || "Phone number is required.",
  }),
});

export const shopIdentitySchema = (t) => z.object({
  shop_name: z.string().min(2, {
    message: t("validation.requiredShopName") || "Shop name is required.",
  }),

  logo: z
    .any()
    .refine((file) => file && file.length > 0, t("validation.requiredIcon") || "Logo image is required.")
    .refine((file) => {
      if (!file || file.length === 0) return true;
      return file[0]?.size <= MAX_FILE_SIZE;
    }, t("settings.imageTooLarge") || "Max file size is 1MB.")
    .refine((file) => {
      if (!file || file.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type);
    }, t("settings.invalidFile") || "Only .jpg, .jpeg, .png and .webp formats are supported."),

  chat_id: z.string().optional(),
});

export const contactSupportSchema = (t) => z.object({
  address: z.string().optional(),

  support: z
    .any()
    .optional()
    .refine((file) => {
      if (!file || file.length === 0) return true;
      return file[0]?.size <= MAX_FILE_SIZE;
    }, t("settings.fileTooLarge") || "Max file size is 1MB."),

  social_media: z
    .array(
      z.object({
        platform: z.string().min(1, {
          message: t("validation.requiredTitle") || "Platform is required",
        }),

        url: z.string().url({
          message: t("validation.invalidUrl") || "Must be a valid URL",
        }),
      }),
    )
    .optional(),
});

export const shopRegisterSchema = (t) => accountSetupSchema(t)
  .merge(shopIdentitySchema(t))
  .merge(contactSupportSchema(t));
