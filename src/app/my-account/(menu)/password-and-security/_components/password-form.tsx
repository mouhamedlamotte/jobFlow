"use client";

import { ActionButton } from "@/app/_components/ui/action-button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import PasswordInput from "@/app/_components/ui/password-input";
import { useToast } from "@/app/_hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { AlertCircle } from "lucide-react";
import { updatePassword } from "../_mutations/update-password";
import { UpdatePasswordSchema } from "../_schemas/update-password";

interface PasswordFormProps {}

export const PasswordForm = ({}: PasswordFormProps) => {
  const { toast } = useToast();

  const { form, handleSubmitWithAction, action } = useHookFormAction(
    updatePassword,
    zodResolver(UpdatePasswordSchema),
    {
      actionProps: {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Password updated successfully.",
          });
          form.reset();
        },
        onError: ({ error }) => {
          toast({
            title: "Error!",
            variant: "destructive",
            description: "Failed to update password.",
          });
        },
      },
      formProps: {
        defaultValues: {
          newPassword: "",
          confirmPassword: "",
          currentPassword: "",
        },
        mode: "onChange",
      },
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-6">
        {action.hasErrored && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{action.result.serverError}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your current password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your new password"
                  {...field}
                />
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Confirm your new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit and Delete Buttons */}
        <div className="flex flex-col space-y-4">
          <ActionButton
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
            pending={action.isPending}
          >
            {action.isPending ? "Updating..." : "Update Password"}
          </ActionButton>
        </div>
      </form>
    </Form>
  );
};
