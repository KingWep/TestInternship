import * as z from "zod";
import { emailRule } from "./common/email";
import { passwordRule } from "./common/password";

export const loginSchema = z.object({
  email: emailRule,
  password: z.string().
            trim().
            min(1, { message: "Password is required." }),
});

// export const registerSchema = z.object({
//   fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
//   email: emailRule,
//   password: passwordRule,
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match.",
//   path: ["confirmPassword"],
// });
