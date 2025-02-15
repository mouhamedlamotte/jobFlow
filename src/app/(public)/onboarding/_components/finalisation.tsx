"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/app/_components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select"
import { useOnboardingStore } from "../_stores/useOnboardingStore"
import { Card, CardContent } from "@/app/_components/ui/card"
import Image from 'next/image'

const formSchema = z.object({
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  defaultTemplate: z.string().min(1, "Please select a default template"),
})

const templates = [
  { id: "template1", name: "Professional Template", image: "/static/placeholder.svg?height=200&width=150" },
  { id: "template2", name: "Creative Template", image: "/static/placeholder.svg?height=200&width=150" },
  { id: "template3", name: "Technical Template", image: "/static/placeholder.svg?height=200&width=150" },
  { id: "template4", name: "Modern Template", image: "/static/placeholder.svg?height=200&width=150" },
  { id: "template5", name: "Classic Template", image: "/static/placeholder.svg?height=200&width=150" },
  { id: "template6", name: "Minimalist Template", image: "/static/placeholder.svg?height=200&width=150" },
]

export const Finalisation = () => {
  const { setFinalPreferences, completeOnboarding } = useOnboardingStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portfolioUrl: "",
      defaultTemplate: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setFinalPreferences(values)
    completeOnboarding()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="portfolioUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://your-portfolio.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="defaultTemplate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a Default Cover Letter Template</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all ${
                        field.value === template.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => field.onChange(template.id)}
                    >
                      <CardContent className="p-4">


                        <Image
                          src={template.image || "static/placeholder.svg"}
                          alt={template.name}
                          width={150}
                          height={200}
                          className="w-full h-40 object-cover mb-2"
                        />




                        <p className="text-center font-medium">{template.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Finalize and Access Dashboard</Button>
      </form>
    </Form>
  )
}

