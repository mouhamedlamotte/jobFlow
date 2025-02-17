import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/app/_components/ui/dialog";
import { useToast } from "@/app/_hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendResendTestEmail } from "../_mutations/resend-seetting";
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
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { sendSmtpTestEmail } from "../_mutations/stmp-setting";



const SendTestEmailSchema = z.object({
    testEmail: z.string().email("Cette adresse email n'est pas valide."),
  });

export const SendTestEmail = () => {
    const pathname = usePathname();
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const { toast } = useToast();

    const service = pathname.split("/").pop();


    const form = useForm<z.infer<typeof SendTestEmailSchema>>({
      resolver: zodResolver(SendTestEmailSchema),
      defaultValues: {
        testEmail: "",
      },
    });

    const { action: resendTestEmailAction } = useHookFormAction(sendResendTestEmail, zodResolver(z.object({ testEmail: z.string().email() })), {
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

    const { action: stmpTestEmailAction } = useHookFormAction(sendSmtpTestEmail, zodResolver(z.object({ testEmail: z.string().email() })), {
        actionProps: {
          onSuccess: () => {
            toast({
              title: "Test email sent",
              description: "A test email has been sent to the provided address.",
            });
            setIsTestModalOpen(false);
          },
          onError: (error) => {
            toast({
              title: "Une erreur est survenue",
              description: error?.error?.serverError ?? 'Le serveur n\'a pas pu envoyer l\'email de test. Veuillez réessayer.',
              variant: "destructive",
            });
          },
        },
      });
  
    return (
      <Dialog open={isTestModalOpen} onOpenChange={setIsTestModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Envoyer un mail de test</Button>
          </DialogTrigger>
          <DialogContent>
      <Form {...form}>
          <form onSubmit={form.handleSubmit((values) =>{
            if (service === "resend") {
              resendTestEmailAction.execute(values);
            } else {
              stmpTestEmailAction.execute(values);
            }
          })} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Envoyer un email de test</DialogTitle>
              <DialogDescription>
                Entrer une adresse email pour envoyer un email de test en utilisant vos paramètres {service}.
              </DialogDescription>
            </DialogHeader>
          <FormField
              control={form.control}
              name="testEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="py-6 focus-visible:ring-0" type="email" placeholder="noreply@yourdomain.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                <DialogFooter  className="flex justify-end">
              <Button
                variant="outline"
                type="submit"
                disabled={resendTestEmailAction.status === "executing" || stmpTestEmailAction.status === "executing"}
                >
                { resendTestEmailAction.status === "executing" || stmpTestEmailAction.status === "executing" ? <Loader className="w-4 h-4 animate-spin" /> : "Envoyer"}
              </Button>
            </DialogFooter>
                </form>
                </Form>
          </DialogContent>
        </Dialog>
    )
  }
  