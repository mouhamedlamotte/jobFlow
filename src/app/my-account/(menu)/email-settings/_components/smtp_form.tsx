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
import { Edit, Loader } from "lucide-react";
import { useState } from "react";

// Form schema
const formSchema = z.object({
  smtpServer: z.string().min(1, "SMTP server is required"),
  smtpPort: z.string().min(1, "SMTP port is required"),
  smtpEmail: z.string().email("Invalid email address"),
  smtpPassword: z.string().min(1, "SMTP password is required"),
});

const SmtpForm = ({
  initialValues,
}: {
  initialValues: z.infer<typeof formSchema> | null;
}) => {
  const { toast } = useToast();
  const [isEditingPassword, setIsEditingPassword] = useState(
    !initialValues?.smtpPassword,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  // Save SMTP settings action
  const { action: saveAction } = useHookFormAction(
    saveSmtpSettings,
    zodResolver(formSchema),
    {
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
    },
  );

  const togglePasswordEdit = () => {
    setIsEditingPassword(!isEditingPassword);
    if (!isEditingPassword) {
      form.setValue("smtpPassword", "");
    } else {
      form.setValue(
        "smtpPassword",
        form.getValues("smtpPassword") ?? initialValues?.smtpPassword ?? "",
      );
    }
  };
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => saveAction.execute(values))}
          className="space-y-4"
        >
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
                  <Input
                    type="email"
                    placeholder="noreply@example.com"
                    {...field}
                  />
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
                <div className="flex items-center justify-start space-x-2">
                  <FormControl>
                    {isEditingPassword || !initialValues?.smtpPassword ? (
                      <Input
                        type="password"
                        placeholder="Enter your SMTP password"
                        {...field}
                      />
                    ) : (
                      <div className="w-full rounded-md border px-4 py-2">
                        {initialValues?.smtpPassword
                          ? "••••••••••••••••••••••••"
                          : "pas encore de mot de passe"}
                      </div>
                    )}
                  </FormControl>
                  <Button
                    className=""
                    type="button"
                    variant="ghost"
                    onClick={togglePasswordEdit}
                  >
                    {isEditingPassword ? "Cancel" : <Edit />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="secondary"
            className="w-full"
            type="submit"
            disabled={
              saveAction.status === "executing" || // Disable if the action is loading
              !form.formState.isValid || // Disable if the form is not valid
              (initialValues?.smtpPassword === form.getValues("smtpPassword") &&
                initialValues?.smtpEmail === form.getValues("smtpEmail") &&
                initialValues?.smtpPort === form.getValues("smtpPort") &&
                initialValues?.smtpServer === form.getValues("smtpServer")) // Disable if all values are the same as initial values
            }
          >
            {saveAction.status === "executing" ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Enregistrer"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SmtpForm;
