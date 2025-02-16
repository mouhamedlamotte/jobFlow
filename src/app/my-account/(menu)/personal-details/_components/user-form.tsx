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
import { Input } from "@/app/_components/ui/input";
import { useToast } from "@/app/_hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { AlertCircle } from "lucide-react";
import { MyAccountGetUserById } from "../../../_queries/get-user-by-id";
import { updateUser } from "../_mutations/update-user";
import { UpdateUserSchema } from "../_schemas/update-user";

interface UserFormProps {
  initialData: MyAccountGetUserById;
}

export const UserForm = ({ initialData }: UserFormProps) => {
  const { toast } = useToast();

  const { form, handleSubmitWithAction, action } = useHookFormAction(
    updateUser,
    zodResolver(UpdateUserSchema),
    {
      actionProps: {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Profile updated successfully.",
          });
        },
        onError: ({ error }) => {
          toast({
            title: "Error!",
            variant: "destructive",
            description: "Failed to update profile.",
          });
        },
      },
      formProps: {
        defaultValues: {
          id: initialData?.id || undefined,
          email: initialData?.email || "",
          name: initialData?.name || "",
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

        {/* User Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter user email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter user name" {...field} />
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
            {action.isPending ? "Updating..." : "Update Profile"}
          </ActionButton>
        </div>
      </form>
    </Form>
  );
};
