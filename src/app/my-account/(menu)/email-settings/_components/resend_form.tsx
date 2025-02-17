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
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveResendSettings, sendResendTestEmail } from "../_mutations/resend-seetting";
import { useToast } from "@/app/_hooks/use-toast";
import { Loader } from "lucide-react";

// Form schema
const formSchema = z.object({
  resendApiKey: z.string().min(1, "API Key is required"),
  resendEmail: z.string().email("Invalid email address"),
});

const ResendForm = () => {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resendApiKey: "",
      resendEmail: "",
    },
  });

  // Save Resend settings action
  const { action: saveAction } = useHookFormAction(saveResendSettings, zodResolver(formSchema), {
    actionProps: {
      onSuccess: () => {
        toast({
          description: "Vos paramètres Resend ont bien été sauvegardés.",
        });
      },
      onError: () => {
        toast({
          title: "Une erreur est survenue",
          description: "Nous n'avons pas pu sauvegarder vos paramètres Resend. Veuillez réessayer.",
          variant: "destructive",
        });
      },
    },
  });

  // Send test email action
  const { action: testEmailAction } = useHookFormAction(sendResendTestEmail, zodResolver(z.object({ testEmail: z.string().email() })), {
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
                  <Input className="py-6  focus-visible:ring-0" type="password" placeholder="*************"  autoComplete="off" {...field} />
                </FormControl>
                <FormDescription>Votre API key est stockée de manière sécurisée.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resendEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Resend</FormLabel>
                <FormControl>
                  <Input className="py-6 focus-visible:ring-0" type="email" placeholder="noreply@yourdomain.com" {...field} />
                </FormControl>
                <FormDescription>Cet email sera utilisé par Resend pour envoyer les emails</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="secondary" className="w-full" type="submit" disabled={saveAction.status === "executing"}>
            {saveAction.status === "executing" ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : "Enregistrer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResendForm;