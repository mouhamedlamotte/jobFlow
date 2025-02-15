import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { PageProps } from "@/types/page-props";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";
import LoginForm from "./_components/login-form";

export default async function RegisterPage({ searchParams }: PageProps) {
  const { verified } = searchParams;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        {verified && (
          <div className="rounded-md mb-4 flex items-start text-sm border border-green-600 text-green-600 p-2">
            <CheckCircle className="w-4 mr-2 shrink-0" />
            Your email has been verified. You can now login to your account.
          </div>
        )}
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Suspense>
          <LoginForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
