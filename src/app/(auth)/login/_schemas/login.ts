import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string(),
  callbackUrl: z.string().optional(),
});

export type LoginInputs = z.infer<typeof LoginSchema>;
