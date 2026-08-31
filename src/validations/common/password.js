import * as z from "zod";

export const passwordRule = z
  .string()
  .trim()
  .min(8, { message: "Password must be at least 8 characters long." })
