"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useOnboardingStore } from "../_stores/useOnboardingStore";
import { useAction } from "next-safe-action/hooks";
import { saveEmailConfig } from "../mutations/email_config";
import { useSession } from "next-auth/react";

// Define the schemas for SMTP and Resend configurations
const smtpSchema = z.object({
  service: z.enum(["gmail", "outlook", "yahoo", "custom"]),
  server: z.string().min(1, "SMTP server is required"),
  port: z.string().regex(/^\d+$/, "Port must be a number"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const resendSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
});

export const EmailConfig = () => {
  const { setStep, setEmailConfig } = useOnboardingStore();
  const [configType, setConfigType] = useState<"smtp" | "resend">("resend");
  const { data : session } = useSession()

  const smtpForm = useForm<z.infer<typeof smtpSchema>>({
    resolver: zodResolver(smtpSchema),
    defaultValues: {
      service: "gmail",
      server: "",
      port: "",
      email: "",
      password: "",
    },
  });

  const resendForm = useForm<z.infer<typeof resendSchema>>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  const { execute, status } = useAction(saveEmailConfig, {
    onSuccess: (data) => {
      console.log("Email configuration saved successfully:", data);
      setEmailConfig({
        type: configType,
        ...data.data,
      }); // Save the configuration to the store
      setStep(4); // Move to the next step
    },
    onError: (error) => {
      console.error("Failed to save email configuration:", error);
      alert("Failed to save email configuration. Please try again.");
    },
  });

  const handleConfigTypeChange = (value: string) => {
    setConfigType(value as "smtp" | "resend");
  };

  const onSubmitSMTP = (values: z.infer<typeof smtpSchema>) => {
    execute({ type: "smtp", userId: session?.user?.id as string, ...values });
  };

  const onSubmitResend = (values: z.infer<typeof resendSchema>) => {
    execute({ type: "resend", userId: session?.user?.id as string, ...values });
  };

  return (
    <div className="space-y-8">
      <Select
        defaultValue="resend"
        onValueChange={(value) => handleConfigTypeChange(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select email configuration type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="resend">Resend API</SelectItem>
          <SelectItem value="smtp">SMTP</SelectItem>
        </SelectContent>
      </Select>

      {configType === "smtp" ? (
        <Form {...smtpForm}>
          <form
            onSubmit={smtpForm.handleSubmit(onSubmitSMTP)}
            className="space-y-4"
          >
            <FormField
              control={smtpForm.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SMTP Service</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select SMTP service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmail">Gmail</SelectItem>
                      <SelectItem value="outlook">Outlook</SelectItem>
                      <SelectItem value="yahoo">Yahoo</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={smtpForm.control}
              name="server"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SMTP Server</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={smtpForm.control}
              name="port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={smtpForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={smtpForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={status === "executing"}>
              {status === "executing" ? "Saving..." : "Next"}
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...resendForm}>
          <form
            onSubmit={resendForm.handleSubmit(onSubmitResend)}
            className="space-y-4"
          >
            <FormField
              control={resendForm.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resend API Key</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={status === "executing"}>
              {status === "executing" ? "Saving..." : "Next"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default EmailConfig;