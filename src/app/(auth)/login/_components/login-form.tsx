"use client";

import { ActionButton } from "@/app/_components/ui/action-button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import PasswordInput from "@/app/_components/ui/password-input";
import { rootUrl } from "@/lib/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { Route } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInputs, LoginSchema } from "../_schemas/login";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || rootUrl;
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInputs) => {
    setIsLoading(true);
    // Clear previous errors
    setServerError(null);

    const res = await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      email: data.email,
      password: data.password,
      callbackUrl,
    });

    if (res?.error) {
      let message = "An unexpected error occurred. Please try again.";

      switch (res.error) {
        case "CredentialsSignin":
          message = "Invalid email or password.";
          break;
        default:
          message = "An unexpected error occurred. Please try again.";
      }

      setServerError(message);
    } else {
      // Successful login, redirect to callbackUrl
      router.push(callbackUrl as Route);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {serverError && (
          <div className="space-y-2">
            {/* Display server errors */}
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          </div>
        )}

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <ActionButton
            className="w-full"
            pending={isLoading}
            // disabled={isLoading || !form.formState.isValid}
          >
            Login
          </ActionButton>
        </div>

        <div className="text-center">
          <p className="text-zinc-500 dark:text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>

        <Button size="sm" variant="link" asChild className="w-full">
          <Link href="/">Back to home</Link>
        </Button>
      </form>
    </Form>
  );
}
