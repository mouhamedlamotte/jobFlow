import prisma from "@/prisma";
import { unstable_cache } from "next/cache";

export const getUserLinks = unstable_cache(
  async (userId?: string) => {
    if (!userId) return null;

    return await prisma.userLinks.findFirst({
      where: { id: userId },
    });
  },
  ["myAccount.getUserLinks"],
  { revalidate: 3600, tags: ["myAccount.getUserLinks"] },
);

export type MyAccountgetUserLinks = Awaited<ReturnType<typeof getUserLinks>>;
