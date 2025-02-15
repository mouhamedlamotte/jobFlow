"use server";

import { PASSWORD_SALT_ROUNDS } from "@/app/_constants/auth";
import prisma from "@/prisma";
import { actionClient } from "@/server/safe-action";
import { hash } from "bcryptjs";
import { RegisterSchema } from "../_schemas/register";

export const register = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const normalizedEmail = email.toLowerCase().trim();

      // Additional email checks
      if (normalizedEmail.includes("+") || normalizedEmail.length > 255) {
        throw new Error("Invalid email format");
      }

      // Hash password with constant time algorithm
      const hashedPassword = await hash(password, PASSWORD_SALT_ROUNDS);

      // Create user with transaction to ensure atomicity
      const user = await prisma.$transaction(async (tx) => {
        // Check if user exists first
        const existing = await tx.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (existing) {
          throw new Error("A user with this email already exists");
        }

        return tx.user.create({
          data: {
            email: normalizedEmail,
            password: hashedPassword,
          },
        });
      });

      return { success: true };
    } catch (error: any) {
      console.error("Registration Error:", error);

      if (error.code === "P2002") {
        throw new Error("A user with this email already exists");
      }

      // Throw the original error message if it's one of our custom errors
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Registration failed. Please try again later");
    }
  });
