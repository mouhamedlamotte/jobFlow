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
import { saveSmtpSettings, sendSmtpTestEmail } from "../_mutations/stmp-setting";

// Form schema
const formSchema = z.object({
  smtpServer: z.string().min(1, "SMTP server is required"),
  smtpPort: z.string().min(1, "SMTP port is required"),
  smtpEmail: z.string().email("Invalid email address"),
  smtpPassword: z.string().min(1, "SMTP password is required"),
});

const SmtpForm = () => {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smtpServer: "",
      smtpPort: "",
      smtpEmail: "",
      smtpPassword: "",
    },
  });

  // Save SMTP settings action
  const { action: saveAction } = useHookFormAction(saveSmtpSettings, zodResolver(formSchema), {
    actionProps: {
      onSuccess: () => {
        toast({
          title: "Settings saved",
          description: "Your SMTP settings have been saved successfully.",
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
  const { action: testEmailAction } = useHookFormAction(sendSmtpTestEmail, zodResolver(z.object({ testEmail: z.string().email() })), {
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
            name="smtpServer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SMTP Server</FormLabel>
                <FormControl>
                  <Input placeholder="smtp.example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="smtpPort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SMTP Port</FormLabel>
                <FormControl>
                  <Input placeholder="465" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="smtpEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SMTP Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="noreply@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="smtpPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SMTP Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your SMTP password" {...field} />
                </FormControl>
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
              Enter an email address to send a test email using your SMTP settings.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="email"
            placeholder="test@example.com"
            onChange={(e) => form.setValue("smtpEmail", e.target.value)}
          />
          <DialogFooter>
            <Button
              onClick={() => testEmailAction.execute({ testEmail: form.getValues("smtpEmail") })}
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

export default SmtpForm;