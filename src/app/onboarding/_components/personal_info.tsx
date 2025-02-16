"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/_components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { useOnboardingStore } from "../_stores/useOnboardingStore"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { PersonalInfoSchema } from "../_schemas/personal_info_schema"
import { useAction } from "next-safe-action/hooks"
import { updatePersonalInfo } from "../mutations/upadte_user_profile"


export const PersonalInfo = () => {
  const { setStep, setPersonalInfo } = useOnboardingStore()
  const { data:session} = useSession()

  const form = useForm<z.infer<typeof PersonalInfoSchema>>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: session?.user?.email ?? "",
      phone: "",
    },
  })

  const { execute, status } = useAction(updatePersonalInfo, {
    onSuccess: (data) => {
      console.log("Personal info updated successfully:", data);
      setPersonalInfo({
        firstName: data.data?.firstName as string,
        lastName: data.data?.lastName as string,
        email: session?.user?.email as string,
        phone: data.data?.phone as string
      });
      setStep(2);
    },
    onError: (error) => {
      console.error("Failed to update personal info:", error);
      alert("Failed to update personal info. Please try again.");
    },
  });
  


  const onSubmit = (values: z.infer<typeof PersonalInfoSchema>) => {
    execute({
      email: session?.user?.email as string,
      ...values
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
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
              <FormLabel>Last Name</FormLabel>
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
                <Input disabled type="email" value={session?.user?.email} />
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
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
        <Button type="button"
        disabled={form.formState.isLoading}
        onClick={form.handleSubmit(onSubmit)}
        >Suivant</Button>
        </div>
      </form>
    </Form>
  )
}

