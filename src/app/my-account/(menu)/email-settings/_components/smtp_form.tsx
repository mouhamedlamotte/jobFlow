"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

import { useToast } from "@/app/_components/ui/use-toast";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveSmtpSettings } from "../_mutations/stmp-setting";
import { Loader } from "lucide-react";

// Form schema
const formSchema = z.object({
  smtpServer: z.string().min(1, "SMTP server is required"),
  smtpPort: z.string().min(1, "SMTP port is required"),
  smtpEmail: z.string().email("Invalid email address"),
  smtpPassword: z.string().min(1, "SMTP password is required"),
});

const SmtpForm = () => {
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
          <Button variant="secondary" className="w-full" type="submit" disabled={saveAction.status === "executing"}>
            {saveAction.status === "executing" ? <Loader className="h-4 w-4 animate-spin" /> : "Enregistrer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SmtpForm;