import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "validation.requiredName"),
  email: z.string().email("validation.invalidEmail"),
  password: z.string().optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine((data) => {
  if (data.password && data.password !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "validation.invalidPassword",
  path: ["confirmPassword"],
});
