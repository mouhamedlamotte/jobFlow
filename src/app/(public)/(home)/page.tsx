"use client";

import { GoogleIcon } from "@/app/_components/icons/google-icon";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { rootUrl } from "@/lib/routing";
import { PageProps } from "@/types/page-props";
import { Github } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const callbackUrl = "http://localhost:3000/api/auth/callback/google";
    const { status } = useSession();
    const router = useRouter();

    if (status === "authenticated"){
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-2xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">JobFlow</CardTitle>
                        <CardDescription>Vous êtes déjà connecté</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button asChild className="w-full" variant="secondary">
                            <Link href={{ pathname: "/my-account" }}>
                                Accéder à votre compte
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">JobFlow</CardTitle>
          <CardDescription>Connetez vous pour continuer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full" variant="secondary">
            <Link href={{ pathname: "/login" }}>
              Se connecter avec email
            </Link>
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuer avec
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline"
              onClick={() => {
                signIn("google", { callbackUrl });
              }}
            >
              <GoogleIcon/>
              Google
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            En continuant, vous acceptez nos{" "}
            <Link href={{ pathname: "/terms" }} className="underline underline-offset-4 hover:text-primary">
              Conditions d&apos;utilisation
            </Link>{" "}
            et notre{" "}
            <Link href={{ pathname: "/privacy" }} className="underline underline-offset-4 hover:text-primary">
              Politique de confidentialité
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
