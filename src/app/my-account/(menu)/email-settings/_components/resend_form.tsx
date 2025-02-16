"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { useToast } from "@/app/_components/ui/use-toast";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveResendSettings, sendTestEmail } from "../_mutations/resend-seetting";

// Form schema
const formSchema = z.object({
  resendApiKey: z.string().min(1, "API Key is required"),
  fromEmail: z.string().email("Invalid email address"),
});

const ResendForm = () => {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resendApiKey: "",
      fromEmail: "",
    },
  });

  // Save Resend settings action
  const { action: saveAction } = useHookFormAction(saveResendSettings, zodResolver(formSchema), {
    actionProps: {
      onSuccess: () => {
        toast({
          title: "Settings saved",
          description: "Your Resend API settings have been saved successfully.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to save settings. Please try again.",
          variant: "destructive",
        });
      },
    },
  });

  // Send test email action
  const { action: testEmailAction } = useHookFormAction(sendTestEmail, zodResolver(z.object({ testEmail: z.string().email() })), {
    actionProps: {
      onSuccess: () => {
        toast({
          title: "Test email sent",
          description: "A test email has been sent to the provided address.",
        });
        setIsTestModalOpen(false);
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to send test email. Please check your settings and try again.",
          variant: "destructive",
        });
      },
    },
  });

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => saveAction.execute(values))} className="space-y-4">
          <FormField
            control={form.control}
            name="resendApiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resend API Key</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your Resend API key" {...field} />
                </FormControl>
                <FormDescription>Your Resend API key will be securely stored.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fromEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="noreply@yourdomain.com" {...field} />
                </FormControl>
                <FormDescription>The email address that will be used as the sender.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={saveAction.status === "executing"}>
            {saveAction.status === "executing" ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </Form>

      <Dialog open={isTestModalOpen} onOpenChange={setIsTestModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Test Email</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Test Email</DialogTitle>
            <DialogDescription>
              Enter an email address to send a test email using your Resend settings.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="email"
            placeholder="test@example.com"
            onChange={(e) => form.setValue("fromEmail", e.target.value)}
          />
          <DialogFooter>
            <Button
              onClick={() => testEmailAction.execute({ testEmail: form.getValues("fromEmail") })}
              disabled={testEmailAction.status === "executing"}
            >
              {testEmailAction.status === "executing" ? "Sending..." : "Send Test Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResendForm;