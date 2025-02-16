"use server";

import { put } from "@vercel/blob";
import prisma from "@/prisma";
import { actionClient } from "@/server/safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Define the input schema for the file upload
const UploadFileSchema = z.object({
  fileName: z.string(),
  fileData: z.string(), // Base64 encoded file data
  userId: z.string(), // User ID from the session
});

export const uploadFile = actionClient
  .schema(UploadFileSchema)
  .action(async ({ parsedInput: { fileName, fileData, userId } }) => {
    try {
      // Convert base64 file data to a Buffer
      const binaryData = Buffer.from(fileData, "base64");

      // Upload the file to Vercel Blob
      const { url } = await put(`cvs/${fileName}-${userId}.pdf`, binaryData, {
        access: "public",
      });

      // Save the file metadata to the database
      const userCv = await prisma.userCV.create({
        data: {
          cv_filename: fileName,
          cv_url: url,
          userId: userId, // Use the provided user ID
          primary: true, // Set as primary CV
        },
      });

      // Revalidate any cached data if necessary
      revalidatePath("/onboarding");

      return userCv;
    } catch (error: any) {
      console.error("Failed to upload file:", error);

      if (error.code === "P2002") {
        throw new Error("A CV with this filename already exists for this user.");
      }

      throw new Error("Failed to upload file. Please try again.");
    }
  });