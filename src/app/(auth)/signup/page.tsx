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

export default function RegisterPage() {

  return (
    <main className="relative flex items-center justify-center w-screen h-screen bg-cover">
      <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your details below to create a new account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <RegisterForm />
            </CardContent>
      </Card>
    </main>
  );
}
