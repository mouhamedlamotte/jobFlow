import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import "next-auth/jwt";

import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  pages:  { signIn: "/" },
  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    checks: ["pkce"],
  }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      return true;
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        console.log("User: ", user);

        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
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

        if (dbUser) {
          token.userId = dbUser.id;
          token.email = dbUser.email;
          token.name = dbUser.name;
          token.picture = dbUser.image;
          token.phone = dbUser.phone;
          token.phoneVerified = dbUser.phoneVerified;
          token.onboarding_completed = dbUser.onboarding_completed;
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token && token.userId && token.email) {
        session.user.id = token.userId;
        session.user.email = token.email;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.phone = token.phone as string;
        session.user.phoneVerified = token.phoneVerified as boolean;
        session.user.onboarding_completed = token.onboarding_completed as boolean;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + '/my-account';
    }
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
});

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      onboarding_completed?: boolean;
      phone ?: string;
      firstName?: string;
      lastName?: string;
      email: string;
      name?: string;
      image?: string;
      phoneVerified?: boolean;

      // ...other properties
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    onboarding_completed?: boolean;
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    userId?: string;
  }
}
