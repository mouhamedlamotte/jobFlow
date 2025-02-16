"use server";

import { PASSWORD_SALT_ROUNDS } from "@/app/_constants/auth";
import { authenticate } from "@/lib/auth/authenticate";
import { InvalidCredentialsError } from "@/lib/errors";
import prisma from "@/prisma";
import { authActionClient } from "@/server/safe-action";
import { hash } from "bcryptjs";
import { UpdatePasswordSchema } from "../_schemas/update-password";

export const updatePassword = authActionClient
  .schema(UpdatePasswordSchema)
  .action(
    async ({
      parsedInput: { confirmPassword, currentPassword, newPassword },
      ctx,
    }) => {
      try {
        if (newPassword !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        // Try to authenticate user with current password
        // Will throw an error if the password is incorrect
        const auth = await authenticate({
          email: ctx.session.user.email,
          password: currentPassword,
        });

        if (!auth.id) {
          throw new InvalidCredentialsError();
        }

        const hashedPassword = await hash(newPassword, PASSWORD_SALT_ROUNDS);

        const updatedUser = await prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            password: hashedPassword,
          },
        });

        return { success: true, user: updatedUser };
      } catch (error: any) {
        console.error("Error in createOrUpdateUser:", error);
        if (error.code === "P2002") {
          throw new Error("A user with this email already exists.");
        }
        throw new Error("Failed to create/update user. Please try again.");
      }
    }
  );
