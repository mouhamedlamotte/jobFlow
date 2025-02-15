import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Link } from "@/app/_components/ui/link";
import { PageProps } from "@/types/page-props";
import { CheckCircle2 } from "lucide-react";
import { Suspense } from "react";
import RegisterForm from "./_components/register-form";

export default function RegisterPage({ searchParams }: PageProps) {
  const { success } = searchParams;

  return (
    <main className="relative flex items-center justify-center w-screen h-screen bg-cover">
      <Card className="w-full max-w-sm">
        {success ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Registration successful!
              </CardTitle>
            </CardHeader>

            <CardContent className="text-muted-foreground space-y-2">
              <p>
                Thank you for signing up. A verification email has been sent to
                your email address.
              </p>
              <p>
                Please check your inbox and follow the instructions to verify
                your account.
              </p>
            </CardContent>
            <CardFooter className="text-muted-foreground">
              <p>
                Once verified, you can <Link href="/login">log in</Link> to your
                account.
              </p>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your details below to create a new account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Suspense>
                <RegisterForm />
              </Suspense>
            </CardContent>
          </>
        )}
      </Card>
    </main>
  );
}
