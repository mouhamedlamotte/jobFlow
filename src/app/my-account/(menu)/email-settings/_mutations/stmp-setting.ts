"use server";

import { z } from "zod";
import { actionClient } from "@/server/safe-action";
import prisma from "@/prisma";
import { auth } from "@/server/auth";
import { encrypt, decrypt } from "@/lib/auth/crypto"; // Import your encryption utilities
import nodemailer from 'nodemailer'

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

    // Encrypt the SMTP password
    const encryptedPassword = encrypt(smtpPassword);

    // Upsert SMTP settings in the database
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

    return { success: true };
  });

// Send test email action for SMTP
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

    // Fetch SMTP settings from the database
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
      throw new Error("SMTP settings not found");
    }

    // Decrypt the SMTP password
    const decryptedPassword = decrypt(emailSettings.hased_smtp_password);
    console.log("Decrypted password:", decryptedPassword);
    

    // Configure nodemailer for STARTTLS
    const transporter = nodemailer.createTransport({
      host: emailSettings.smtp_server, // smtp.gmail.com
      port: parseInt(emailSettings.smtp_port), // 587
      secure: false, // Use `false` for STARTTLS
      auth: {
        user: emailSettings.smtp_email, // Your Gmail address
        pass: decryptedPassword, // Your app-specific password
      },
      tls: {
        rejectUnauthorized: false, // Bypass SSL certificate validation (use with caution)
      },
    });

    try {
      await transporter.sendMail({
        from: emailSettings.smtp_email,
        to: testEmail,
        subject: "Test Email from Your App",
        text: "This is a test email sent from your app using SMTP.",
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to send test email:", error);
      throw new Error("Failed to send test email. Please check your SMTP settings.");
    }
  });