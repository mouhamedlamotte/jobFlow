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
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { register } from "../_mutations/register";
import { RegisterSchema } from "../_schemas/register";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || rootUrl;

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    register,
    zodResolver(RegisterSchema),
    {
      actionProps: {
        onSuccess: () => {
          typeof window !== "undefined" && window.location.replace(`/onboarding?email=${form.getValues().email}`);
        },
      },
      formProps: {
        defaultValues: {
          email: "",
          password: "",
          confirmPassword: "",
        },
        mode: "onChange",
      },
      errorMapProps: {},
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-6">
        {action.hasErrored && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{action.result.serverError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email Address" {...field} type="email" />
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <ActionButton
            className="w-full"
            pending={action.isPending}
            // disabled={!form.formState.isValid}
          >
            Register
          </ActionButton>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
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
