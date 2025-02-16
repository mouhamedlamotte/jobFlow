import prisma from "@/prisma";
import { unstable_cache } from "next/cache";

export const getUserById = unstable_cache(
  async (id?: string) => {
    if (!id) return null;

    return await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        phone: true,
        phoneVerified: true,
        onboarding_completed: true,
        firstName: true,
        lastName: true,
      },
    });
  },
  ["myAccount.getUserById"],
  { revalidate: 3600, tags: ["myAccount.getUserById"] },
);

export type MyAccountGetUserById = Awaited<ReturnType<typeof getUserById>>;
