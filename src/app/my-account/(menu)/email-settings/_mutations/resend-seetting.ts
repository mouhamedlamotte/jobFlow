"use server";

import { z } from "zod";
import { actionClient } from "@/server/safe-action";
import prisma from "@/prisma";
import { auth } from "@/server/auth";
import { decrypt, encrypt } from "@/lib/auth/crypto";
import { Resend } from "resend";

// Schema for Resend settings
const resendSettingsSchema = z.object({
  resendApiKey: z.string().min(1),
  fromEmail: z.string().email(),
});

// Save Resend settings action
export const saveResendSettings = actionClient
  .schema(resendSettingsSchema)
  .action(async ({ parsedInput: { resendApiKey, fromEmail } }) => {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Encrypt the Resend API key
    const encryptedApiKey = encrypt(resendApiKey);

    // Upsert Resend settings in the database
    await prisma.emailSettings.upsert({
      where: { user_id: session.user.id },
      update: {
        provider: "RESEND",
        resend_email: fromEmail,
        hased_resend_api_key: encryptedApiKey,
      },
      create: {
        user_id: session.user.id,
        provider: "RESEND",
        resend_email: fromEmail,
        hased_resend_api_key: encryptedApiKey,
      },
    });

    return { success: true };
  });

// Send test email action
const sendTestEmailSchema = z.object({
  testEmail: z.string().email(),
});

export const sendTestEmail = actionClient
  .schema(sendTestEmailSchema)
  .action(async ({ parsedInput: { testEmail } }) => {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Fetch Resend settings from the database
    const emailSettings = await prisma.emailSettings.findUnique({
      where: { user_id: session.user.id },
    });

    if (!emailSettings || !emailSettings.hased_resend_api_key || !emailSettings.resend_email) {
      throw new Error("Email settings not found");
    }

    // Decrypt the Resend API key
    const decryptedApiKey = decrypt(emailSettings.hased_resend_api_key);

    // Send the test email using Resend
    const resend = new Resend(decryptedApiKey);
    await resend.emails.send({
      from: emailSettings.resend_email,
      to: testEmail,
      subject: "Test Email from Your App",
      html: "<p>This is a test email sent from your app using Resend.</p>",
    });

    return { success: true };
  });