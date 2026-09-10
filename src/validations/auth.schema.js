import * as z from "zod";
import { emailRule } from "./common/email";
import { passwordRule } from "./common/password";

export const loginSchema = z.object({
  email: emailRule,
  password: z.string().
            trim().
            min(1, { message: "validation.passwordRequired" }),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, { message: "validation.nameMinLength" }),
  email: emailRule,
  password: passwordRule,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "validation.passwordMismatch",
  path: ["confirmPassword"],
});
