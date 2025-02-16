import { z } from "zod";

export const UpdateUserSchema = z.object({
  id: z.string().uuid("Invalid user ID"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required").optional(),
});
