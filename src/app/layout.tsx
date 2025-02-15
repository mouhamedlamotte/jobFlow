import { Toaster } from "@/app/_components/ui/toaster";
import { SITE_META_DESRIPTION, SITE_NAME } from "@/app/_constants/seo";
import { ThemeProvider } from "@/app/_providers/theme-provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Dancing_Script, Outfit } from "next/font/google";
import TRPCProvider from "./_providers/trpc-provider";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_META_DESRIPTION,
};

const mainFont = Outfit({ subsets: ["latin"] });
export const signatureFont = Dancing_Script({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-background">
      <body className={cn(mainFont.className)} 
        suppressHydrationWarning
      >
        <SessionProvider>
          <TRPCProvider>
            <ReactQueryDevtools initialIsOpen={false} />

            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}

              <Toaster />
            </ThemeProvider>
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
