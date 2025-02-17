"use client"
import { useState } from "react"
import { Button } from "@/app/_components/ui/button"
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/app/_hooks/use-toast"
import { FileUpload } from "@/app/_components/ui/file-upload"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { addUserCV } from "../../personal-details/_mutations/update_user_cv"
import { CVManagementSchema } from "../_schemas/cv-management-shema"
import { useCvStore } from "../stores/useCvStore"
import { useSession } from "next-auth/react"
import { Loader } from "lucide-react"

const UploadCVButton = ({disabled }: { disabled: boolean}) => {
  const {cvs, setCVs} = useCvStore()
  const [file, setFile] = useState<File | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const { data: session } = useSession()
  const userId = session?.user?.id as string

  const handleChange = (selectedFile: File[] | null) => {
    setFile(selectedFile?.[0] || null);
  }

  const { action: addAction } = useHookFormAction(addUserCV, zodResolver(CVManagementSchema), {
    actionProps: {
      onSuccess: (data) => {
        setFile(null)
        setIsDialogOpen(false)
        if (data.data?.cv) {
          setCVs([...cvs, data.data.cv])
        }
        toast({
          description: "CV ajouté avec succès.",
        })
      },
      onError: (error) => {
        toast({
          title: "Une erreur est survenue!",
          variant: "destructive",
          description: "Votre CV n'a pas pu être ajouté. Veuillez réessayer.",
        })
      },
    },
  })

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("userId", userId)
      addAction.execute(formData)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          Ajouter un CV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un CV</DialogTitle>
          <DialogDescription>
            Veuillez choisir un fichier PDF, DOC, ou DOCX.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full mx-auto min-h-48 border border-dashed rounded-lg">
          <FileUpload onChange={handleChange} />
        </div>
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)} variant="outline">
            Annuler
          </Button>
          <Button onClick={handleUpload} disabled={!file || addAction.status === "executing"}>
            {addAction.status === "executing" ?<Loader className="animate-spin" /> : "Charger"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadCVButton
