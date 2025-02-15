"use server";

import { UnauthorizedError } from "@/lib/errors";
import prisma from "@/prisma";
import { authActionClient } from "@/server/safe-action";
import { revalidateTag } from "next/cache";
import { UpdateUserSchema } from "../_schemas/update-user";

export const updateUser = authActionClient
  .schema(UpdateUserSchema)
  .action(async ({ parsedInput: { id, email, name }, ctx }) => {
    try {
      // Prevent user to update other user's data
      if (ctx.session.user.id !== id) {
        throw new UnauthorizedError(
          "You are not authorized to perform this action."
        );
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          email,
          name,
        },
      });

      revalidateTag("myAccount.getUserById");
      return { success: true, user: updatedUser };
    } catch (error: any) {
      console.error("Error in createOrUpdateUser:", error);
      if (error.code === "P2002") {
        throw new Error("A user with this email already exists.");
      }
      throw new Error("Failed to create/update user. Please try again.");
    }
  });
