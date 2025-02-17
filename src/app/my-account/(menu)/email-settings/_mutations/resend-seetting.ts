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
  resendEmail: z.string().email(),
});

export const saveResendSettings = actionClient
  .schema(resendSettingsSchema)
  .action(async ({ parsedInput: { resendApiKey, resendEmail } }) => {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const encryptedApiKey = encrypt(resendApiKey);

    await prisma.emailSettings.upsert({
      where: { user_id: session.user.id },
      update: {
        provider: "RESEND",
        resend_email: resendEmail,
        hased_resend_api_key: encryptedApiKey,
      },
      create: {
        user_id: session.user.id,
        provider: "RESEND",
        resend_email: resendEmail,
        hased_resend_api_key: encryptedApiKey,
      },
    });

    return { success: true };
  });

const sendTestEmailSchema = z.object({
  testEmail: z.string().email(),
});

export const sendResendTestEmail = actionClient
  .schema(sendTestEmailSchema)
  .action(async ({ parsedInput: { testEmail } }) => {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const emailSettings = await prisma.emailSettings.findUnique({
      where: { user_id: session.user.id },
    });

    if (!emailSettings || !emailSettings.hased_resend_api_key || !emailSettings.resend_email) {
      throw new Error("Email settings not found");
    }

    const decryptedApiKey = decrypt(emailSettings.hased_resend_api_key);
    const resend = new Resend(decryptedApiKey);
    await resend.emails.send({
      from: emailSettings.resend_email,
      to: testEmail,
      subject: "Ca marche !",
      text: "Votre config resend avec jobflow marche !",
    });
    return { success: true };
  });