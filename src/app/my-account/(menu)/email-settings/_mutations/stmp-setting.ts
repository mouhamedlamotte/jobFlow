"use server";

import { z } from "zod";
import { actionClient } from "@/server/safe-action";
import prisma from "@/prisma";
import { auth } from "@/server/auth";
import { encrypt, decrypt } from "@/lib/auth/crypto";
import nodemailer from 'nodemailer'
import { revalidatePath } from "next/cache";

// Schema for SMTP settings
const smtpSettingsSchema = z.object({
  smtpServer: z.string().min(1),
  smtpPort: z.string().min(1),
  smtpEmail: z.string().email(),
  smtpPassword: z.string().min(1),
});

// Save SMTP settings action
export const saveSmtpSettings = actionClient
  .schema(smtpSettingsSchema)
  .action(async ({ parsedInput: { smtpServer, smtpPort, smtpEmail, smtpPassword } }) => {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const encryptedPassword = encrypt(smtpPassword);

    await prisma.emailSettings.upsert({
      where: { user_id: session.user.id },
      update: {
        provider: "SMTP",
        smtp_server: smtpServer,
        smtp_port: smtpPort,
        smtp_email: smtpEmail,
        hased_smtp_password: encryptedPassword,
      },
      create: {
        user_id: session.user.id,
        provider: "SMTP",
        smtp_server: smtpServer,
        smtp_port: smtpPort,
        smtp_email: smtpEmail,
        hased_smtp_password: encryptedPassword,
      },
    });
    revalidatePath("/my-account/email-settings/smtp");
    return { success: true };
  });

const sendTestEmailSchema = z.object({
  testEmail: z.string().email(),
});
export const sendSmtpTestEmail = actionClient
  .schema(sendTestEmailSchema)
  .action(async ({ parsedInput: { testEmail } }) => {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const emailSettings = await prisma.emailSettings.findUnique({
      where: { user_id: session.user.id },
    });

    if (
      !emailSettings ||
      !emailSettings.smtp_server ||
      !emailSettings.smtp_port ||
      !emailSettings.smtp_email ||
      !emailSettings.hased_smtp_password
    ) {
      throw new Error("Vous n'avez pas encore configuré votre SMTP.");
    }

    // Decrypt the SMTP password
    const decryptedPassword = decrypt(emailSettings.hased_smtp_password);


    const transporter = nodemailer.createTransport({
      pool: true,
      maxConnections: 1,
      maxMessages: 1,
      rateDelta: 1000,
      rateLimit: 1,
      host: emailSettings.smtp_server,
      port: parseInt(emailSettings.smtp_port),
      secure: false,
      auth: {
        user: emailSettings.smtp_email,
        pass: decryptedPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    }
  );

    try {
      await transporter.sendMail({
        from: emailSettings.smtp_email,
        to: testEmail,
        subject: "Ca marche !",
        text: "Votre config smtp avec jobflow marche !",
      });

      return { success: true };
    } catch (error) {
      throw new Error("Votre config smtp n'a pas pu envoyer l'email de test. Veuillez verifier vos paramètres.");
    } finally {
      transporter.close();
    }
  });