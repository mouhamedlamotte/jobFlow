"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/app/_components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { PersonalInfoSchema } from "@/app/onboarding/_schemas/personal_info_schema"
import { updatePersonalInfo } from "@/app/onboarding/mutations/upadte_user_profile"
import { MyAccountGetUserById } from "@/app/my-account/_queries/get-user-by-id"
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks"
import { useToast } from "@/app/_hooks/use-toast"


export const PersonalInfoForm = ({initialData}: {initialData: MyAccountGetUserById }) => {

  const {toast} = useToast()


  const { form, handleSubmitWithAction, action } = useHookFormAction(
    updatePersonalInfo,
    zodResolver(PersonalInfoSchema),
    {
      actionProps: {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Personal info updated successfully.",
          });
        },
        onError: (error) => {
          console.error("Failed to update personal info:", error);
          toast({
            title: "Error!",
            variant: "destructive",
            description: "Failed to update personal info. Please try again.",
          })
        },
      },
      formProps: {
        defaultValues: {
          firstName: initialData?.firstName as string,
          lastName: initialData?.lastName as string,
          email: initialData?.email ?? "",
          phone: initialData?.phone as string
        },
        mode: "onChange",
      },
      errorMapProps: {},
    },
  )

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled type="email" value={initialData?.email} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de téléphone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
        <Button type="button"
        onClick={handleSubmitWithAction}
        >
 {action.isPending ? "Updating..." : "Update Profile"}
        </Button>
        </div>
      </form>
    </Form>
  )
}

