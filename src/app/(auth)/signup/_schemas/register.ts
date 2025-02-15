import { z } from "zod";


export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"], // set the path of the error
  });

export type RegisterInputs = z.infer<typeof RegisterSchema>;
