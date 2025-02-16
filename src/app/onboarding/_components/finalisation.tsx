"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Card, CardContent } from "@/app/_components/ui/card";
import Image from "next/image";
import { useOnboardingStore } from "../_stores/useOnboardingStore";
import { useAction } from "next-safe-action/hooks";
import { saveFinalPreferences } from "../mutations/final-preferences"; // Define this action
import { useSession } from "next-auth/react";

// Define the form schema
const formSchema = z.object({
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  defaultTemplate: z.string().min(1, "Please select a default template"),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  instagramUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

const templates = [
  {
    id: "1",
    name: "Professional Template",
    image: "/static/placeholder.svg?height=200&width=150",
  },
  {
    id: "2",
    name: "Creative Template",
    image: "/static/placeholder.svg?height=200&width=150",
  },
  {
    id: "3",
    name: "Technical Template",
    image: "/static/placeholder.svg?height=200&width=150",
  },
  {
    id: "4",
    name: "Modern Template",
    image: "/static/placeholder.svg?height=200&width=150",
  },
  {
    id: "5",
    name: "Classic Template",
    image: "/static/placeholder.svg?height=200&width=150",
  },
  {
    id: "0",
    name: "Minimalist Template",
    image: "/static/placeholder.svg?height=200&width=150",
  },
];

export const Finalisation = () => {
  const { setFinalPreferences, completeOnboarding } = useOnboardingStore();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portfolioUrl: "",
      defaultTemplate: "",
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      instagramUrl: "",
    },
  });


  const { execute, status } = useAction(saveFinalPreferences, {
    onSuccess: (data) => {
      console.log("Final preferences saved successfully:", data);
      typeof window !== "undefined" && window.location.replace('/my-account');
    },
    onError: (error) => {
      console.error("Failed to save final preferences:", error);
      alert("Failed to save final preferences. Please try again.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    execute({
      ...values,
      userId : session?.user?.id as string
    }); // Execute the action with the form values
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Portfolio URL */}
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

        {/* GitHub URL */}
        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* LinkedIn URL */}
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Twitter URL */}
        <FormField
          control={form.control}
          name="twitterUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://twitter.com/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Instagram URL */}
        <FormField
          control={form.control}
          name="instagramUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://instagram.com/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Default Template */}
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

        <Button type="submit" disabled={status === "executing"}>
          {status === "executing" ? "Saving..." : "Finalize and Access Dashboard"}
        </Button>
      </form>
    </Form>
  );
};