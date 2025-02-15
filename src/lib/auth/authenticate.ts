import { InvalidCredentialsError } from "@/lib/errors";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";

export async function authenticate(
  credentials: Partial<Record<"email" | "password", unknown>>,
) {

  console.log("idn but for w'ever fucking reason w're here", credentials);
  

  if (!credentials?.email || !credentials.password) {
    throw new InvalidCredentialsError();
  }

  const user = await prisma.user.findUnique({
    where: {
      email: String(credentials.email),
    },
  });

  if (!user || !user.password) {
    throw new InvalidCredentialsError();
  }

  const passwordMatch = await bcrypt.compare(
    String(credentials.password),
    user.password,
  );

  if (!passwordMatch) {
    throw new InvalidCredentialsError();
  }

  return {
    id: user.id,
    email: user.email,
  };
}
