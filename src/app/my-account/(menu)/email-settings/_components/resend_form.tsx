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
import { Edit, Loader } from "lucide-react";

// Form schema
const formSchema = z.object({
  resendApiKey: z.string().min(1, "API Key is required"),
  resendEmail: z.string().email("Invalid email address"),
});

const ResendForm = ({initialValues} : {initialValues : z.infer<typeof formSchema> | null}) => {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const { toast } = useToast();
  const [isEditingApiKey, setIsEditingApiKey] = useState(!initialValues?.resendApiKey)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resendApiKey: initialValues?.resendApiKey || "",
      resendEmail: initialValues?.resendEmail || "",
    }
  });

  // Save Resend settings action
  const { action: saveAction } = useHookFormAction(saveResendSettings, zodResolver(formSchema), {
    actionProps: {
      onSuccess: () => {
        setIsEditingApiKey(false)
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

  const toggleApiKeyEdit = () => {
    setIsEditingApiKey(!isEditingApiKey)
    if (!isEditingApiKey) {
      form.setValue("resendApiKey", "")
    }else {
      form.setValue("resendApiKey", form.getValues("resendApiKey") ?? initialValues?.resendApiKey ?? "")
    }
  }

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
                <div className="flex items-center justify-start space-x-2">
                  <FormControl>
                    {isEditingApiKey || !initialValues?.resendApiKey ? (
                      <Input
                        className="py-6 focus-visible:ring-0"
                        type="password"
                        placeholder="Enter your API key"
                        autoComplete="off"
                        {...field}
                      />
                    ) : (
                      <div className="py-3 px-4 w-full border rounded-md">
                        {initialValues?.resendApiKey ? "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••" : "pas encore de API KEY"}
                      </div>
                    )}
                  </FormControl>
                  {
                    initialValues?.resendApiKey && (
                  <Button className="" type="button" variant="ghost" onClick={toggleApiKeyEdit}>
                    {isEditingApiKey ? "Annuler" : <Edit />}
                  </Button>
                    )
                  }
                </div>
                <FormDescription>Votre API key est stockée de manière sécurisée.</FormDescription>
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
          <Button variant="secondary" className="w-full" type="submit" disabled={saveAction.status === "executing" || (
            initialValues?.resendApiKey === form.getValues("resendApiKey") &&
            initialValues?.resendEmail === form.getValues("resendEmail")
          ) || !form.formState.isValid}>
            {saveAction.status === "executing" ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : "Enregistrer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResendForm;