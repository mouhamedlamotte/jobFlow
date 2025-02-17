import prisma from "@/prisma";
import { unstable_cache } from "next/cache";

export const getResendConfig = unstable_cache(
  async (id?: string, withKey?: boolean) => {
    if (!id) return null;

    return await prisma.emailSettings.findFirst({
      where: { user_id: id },
      select: {
        id: true,
        resend_email: true,
        hased_resend_api_key: withKey ? true : false,
      },
    });
  },
  ["myAccount.getResendConfig"],
  { revalidate: 3600, tags: ["myAccount.getResendConfig"] },
);

export type MyAccountgetResendConfig = Awaited<ReturnType<typeof getResendConfig>>;

export const getStmpConfig = unstable_cache(
  async (id?: string, withPass?: boolean) => {
    if (!id) return null;

    return await prisma.emailSettings.findFirst({
      where: { user_id: id },
      select: {
        id: true,
        smtp_server: true,
        smtp_port: true,
        smtp_email: true,
        hased_smtp_password: withPass ? true : false,
      },
    });
  },
  ["myAccount.getStmpConfig"],
  { revalidate: 3600, tags: ["myAccount.getStmpConfig"] },
);