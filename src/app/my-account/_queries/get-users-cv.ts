import prisma from "@/prisma";
import { unstable_cache } from "next/cache";

export const GetUserCv = unstable_cache(
  async (userId?: string) => {
    if (!userId) return null;

    const userCv = await prisma.userCV.findMany({
      where: { userId },
    });
    console.log("myAccount.getUserCv", userCv);
    return userCv
  },
  
  ["myAccount.getUserCv"],
  { revalidate: 3600, tags: ["myAccount.getUserCv"]},
);

export type MyAccountgetUserCv = Awaited<ReturnType<typeof GetUserCv>>;
