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

export const accountSetupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  email: emailRule,

  password: passwordRule,

  phone: z.string().min(8, {
    message: "Phone number is required.",
  }),
});

export const shopIdentitySchema = z.object({
  shop_name: z.string().min(2, {
    message: "Shop name is required.",
  }),

  logo: z
    .any()
    .refine((file) => file && file.length > 0, "Logo image is required.")
    .refine((file) => {
      if (!file || file.length === 0) return true;
      return file[0]?.size <= MAX_FILE_SIZE;
    }, "Max file size is 1MB.")
    .refine((file) => {
      if (!file || file.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),

  chat_id: z.string().optional(),
});

export const contactSupportSchema = z.object({
  address: z.string().optional(),

  support: z
    .any()
    .optional()
    .refine((file) => {
      if (!file || file.length === 0) return true;
      return file[0]?.size <= MAX_FILE_SIZE;
    }, "Max file size is 5MB."),

  social_media: z
    .array(
      z.object({
        platform: z.string().min(1, {
          message: "Platform is required",
        }),

        url: z.string().url({
          message: "Must be a valid URL",
        }),
      }),
    )
    .optional(),
});

export const shopRegisterSchema = accountSetupSchema
  .merge(shopIdentitySchema)
  .merge(contactSupportSchema);
