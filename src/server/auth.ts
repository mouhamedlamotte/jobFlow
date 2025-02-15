import { authenticate } from "@/lib/auth/authenticate";
import { InvalidCredentialsError } from "@/lib/errors";
import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import NextAuth, { CredentialsSignin } from "next-auth";
import "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, request) {
        try {
          const user = await authenticate(credentials);
          return user;
        } catch (error) {
          if (error instanceof InvalidCredentialsError) {
            throw new InvalidCredentialsError();
          }

          // For any other errors, throw a generic error
          throw new CredentialsSignin();
        }
      },
    }),
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
          },
        });

        if (dbUser) {
          token.userId = dbUser.id;
          token.email = dbUser.email;
          token.name = dbUser.name;
          token.picture = dbUser.image;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token && token.userId && token.email) {
        session.user.id = token.userId;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },
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
      // ...other properties
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {}
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
