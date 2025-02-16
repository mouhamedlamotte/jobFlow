import { passwordValidation } from "@/app/(auth)/signup/_schemas/register";
import { z } from "zod";

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
