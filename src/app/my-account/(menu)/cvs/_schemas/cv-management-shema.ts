import { z } from "zod";

export const CVManagementSchema = z.object({
    id: z.string(),
    cv_filename: z.string(),
    cv_url: z.string(),
    primary: z.boolean(),
    uploaded_at: z.date(),
  })
  