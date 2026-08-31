import * as z from "zod";

export const emailRule = z
  .string()
  .trim()
  .min(5, { message: "Username or Email must be at least 5 characters." })
