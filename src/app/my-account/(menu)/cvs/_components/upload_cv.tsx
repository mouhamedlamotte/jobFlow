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
          title: "Success!",
          description: "CV added successfully.",
        })
      },
      onError: (error) => {
        toast({
          title: "Error!",
          variant: "destructive",
          description: "Failed to add CV. Please try again.",
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
          <DialogTitle>Upload New CV</DialogTitle>
          <DialogDescription>
            Upload a new CV file. Supported formats are PDF, DOC, and DOCX.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full mx-auto min-h-48 border border-dashed rounded-lg">
          <FileUpload onChange={handleChange} />
        </div>
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!file || addAction.status === "executing"}>
            {addAction.status === "executing" ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadCVButton
