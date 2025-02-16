"use server";

import { hash } from "bcryptjs";
import prisma from "@/prisma";
import { actionClient } from "@/server/safe-action";
import { z } from "zod";

// Define the input schema for the email configuration
const EmailConfigSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("smtp"),
    service: z.enum(["gmail", "outlook", "yahoo", "custom"]),
    server: z.string(),
    port: z.string(),
    email: z.string(),
    password: z.string(),
    userId: z.string(),
  }),
  z.object({
    type: z.literal("resend"),
    apiKey: z.string(),
    userId: z.string(),
  }),
]);

export const saveEmailConfig = actionClient
  .schema(EmailConfigSchema)
  .action(async ({ parsedInput } ) => {
    try {
       // Replace with the actual user ID from the session

      if (parsedInput.type === "smtp") {
        // Hash the SMTP password
        const hashedPassword = await hash(parsedInput.password, 12);

        // Save SMTP configuration to the database
        await prisma.emailSettings.upsert({
          where: { user_id: parsedInput.userId },
          update: {
            provider: "SMTP",
            smtp_server: parsedInput.server,
            smtp_port: parsedInput.port,
            smtp_email: parsedInput.email,
            hased_smtp_password: hashedPassword,
          },
          create: {
            user_id: parsedInput.userId,
            provider: "SMTP",
            smtp_server: parsedInput.server,
            smtp_port: parsedInput.port,
            smtp_email: parsedInput.email,
            hased_smtp_password: hashedPassword,
          },
        });
      } else if (parsedInput.type === "resend") {
        // Hash the Resend API key
        const hashedApiKey = await hash(parsedInput.apiKey, 12);

        // Save Resend configuration to the database
        await prisma.emailSettings.upsert({
          where: { user_id: parsedInput.userId },
          update: {
            provider: "RESEND",
            hased_resend_api_key: hashedApiKey,
          },
          create: {
            user_id: parsedInput.userId,
            provider: "RESEND",
            hased_resend_api_key: hashedApiKey,
          },
        });
      }

      return { success: true };
    } catch (error: any) {
      console.error("Failed to save email configuration:", error);

      if (error.code === "P2002") {
        throw new Error("Email configuration already exists for this user.");
      }

      throw new Error("Failed to save email configuration. Please try again.");
    }
  });