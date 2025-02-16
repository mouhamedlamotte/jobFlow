import { z } from "zod";

export const PersonalInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().optional(),
  phone: z.string().optional(),
});