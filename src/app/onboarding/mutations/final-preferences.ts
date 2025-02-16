"use server";

import prisma from "@/prisma";
import { actionClient } from "@/server/safe-action";
import { z } from "zod";

// Define the input schema for the final preferences
const FinalPreferencesSchema = z.object({
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  defaultTemplate: z.string(),
  githubUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  userId : z.string()
});

export const saveFinalPreferences = actionClient
  .schema(FinalPreferencesSchema)
  .action(async ({ parsedInput }) => {
    try {


      // Save the default template preference
      await prisma.userPreferences.upsert({
        where: { user_id: parsedInput.userId },
        update: {
          defaultTemplateId: parsedInput.defaultTemplate,
        },
        create: {
          user_id: parsedInput.userId,
          defaultTemplateId: parsedInput.defaultTemplate,
        },
      });

      // Save the portfolio URL
      if (parsedInput.portfolioUrl) {
        await prisma.userLinks.upsert({
          where: { userId_name: { userId:parsedInput.userId, name: "PORTFOLIO" } },
          update: {
            url: parsedInput.portfolioUrl,
          },
          create: {
            userId : parsedInput.userId,
            name: "PORTFOLIO",
            url: parsedInput.portfolioUrl,
          },
        });
      }

      // Save GitHub URL
      if (parsedInput.githubUrl) {
        await prisma.userLinks.upsert({
          where: { userId_name: { userId : parsedInput.userId, name: "GITHUB" } },
          update: {
            url: parsedInput.githubUrl,
          },
          create: {
            userId : parsedInput.userId,
            name: "GITHUB",
            url: parsedInput.githubUrl,
          },
        });
      }

      // Save LinkedIn URL
      if (parsedInput.linkedinUrl) {
        await prisma.userLinks.upsert({
          where: { userId_name: { userId:parsedInput.userId, name: "LINKEDIN" } },
          update: {
            url: parsedInput.linkedinUrl,
          },
          create: {
            userId:parsedInput.userId,
            name: "LINKEDIN",
            url: parsedInput.linkedinUrl,
          },
        });
      }

      // Save Twitter URL
      if (parsedInput.twitterUrl) {
        await prisma.userLinks.upsert({
          where: { userId_name: { userId:parsedInput.userId, name: "TWITTER" } },
          update: {
            url: parsedInput.twitterUrl,
          },
          create: {
            userId:parsedInput.userId,
            name: "TWITTER",
            url: parsedInput.twitterUrl,
          },
        });
      }

      // Save Instagram URL
      if (parsedInput.instagramUrl) {
        await prisma.userLinks.upsert({
          where: { userId_name: { userId:parsedInput.userId, name: "INSTAGRAM" } },
          update: {
            url: parsedInput.instagramUrl,
          },
          create: {
            userId:parsedInput.userId,
            name: "INSTAGRAM",
            url: parsedInput.instagramUrl,
          },
        });
      }

      return { success: true };
    } catch (error: any) {
      console.error("Failed to save final preferences:", error);

      if (error.code === "P2002") {
        throw new Error("Preferences already exist for this user.");
      }

      throw new Error("Failed to save final preferences. Please try again.");
    }
  });