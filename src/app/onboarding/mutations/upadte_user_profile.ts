"use server";

import { actionClient } from "@/server/safe-action";
import { z } from "zod";
import prisma from "@/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { PersonalInfoSchema } from "../_schemas/personal_info_schema";
import { auth } from "@/server/auth";



export const updatePersonalInfo = actionClient
  .schema(PersonalInfoSchema)
  .action(async ({ parsedInput: { firstName, lastName, email, phone } }) => {

    const session = await auth();

    try {
      // Normalize the email
      const normalizedEmail = email?.toLowerCase().trim();

      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Update the user's personal info
      const updatedUser = await prisma.user.update({
        where: { email: normalizedEmail },
        data: {
          name : `${firstName} ${lastName}`,
          email: normalizedEmail,
          firstName,
          lastName,
          phone,
        },
      });

      

      // Revalidate any cached data if necessary
      revalidateTag("myAccount.getUserById");
      return { success: true, user: updatedUser };

    } catch (error: any) {
      console.error("Failed to update personal info:", error);

      if (error.code === "P2025") {
        throw new Error("User not found");
      }

      throw new Error("Failed to update personal info. Please try again.");
    }
  });