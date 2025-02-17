"use client"
import { Button } from "@/app/_components/ui/button"
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/app/_hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card"
import { FaFilePdf, FaFileWord, FaFile } from "react-icons/fa"
import { useCvStore } from "../../cvs/stores/useCvStore"
import { CVManagementSchema } from "../_schemas/cv-management-shema"
import { UserCV } from "@prisma/client"
import { removeUserCV, setUserCVPrimary } from "../../personal-details/_mutations/update_user_cv"


const CvCard = ({cv}: {cv: UserCV}) => {
    const { toast } = useToast()
  const {cvs, setCVs} = useCvStore()


      const { action: removeAction } = useHookFormAction(removeUserCV, zodResolver(CVManagementSchema), {
        actionProps: {
          onSuccess: (data) => {
            setCVs(cvs.filter((cv) => cv.id !== data.data?.id))
            toast({
              description: "CV supprimé avec succès.",
            })
          },
          onError: (error) => {
            toast({
              title: "Une erreur est survenue!",
              variant: "destructive",
              description: error?.error.serverError ?? "Votre CV n'a pas pu être supprimé. Veuillez réessayer.",
            })
          },
        },
      })

      const { action: setPrimaryAction } = useHookFormAction(setUserCVPrimary, zodResolver(CVManagementSchema), {
        actionProps: {
          onSuccess: (data) => {
            setCVs(
              cvs.map((cv) => ({
                ...cv,
                primary: cv.id === data.data?.id,
              })),
            )
            toast({
              description: `${cv.cv_filename} est désormais votre CV par défaut`,
            })
          },
          onError: (error) => {
            toast({
              title: "Une erreur est survenue!",
              variant: "destructive",
              description: error?.error.serverError ?? "Votre CV n'a pas pu être modifié. Veuillez réessayer.",
            })
          },
        },
      })

      const getFileIcon = (filename: string) => {
        const extension = filename?.split(".")?.pop()?.toLowerCase()
        switch (extension) {
          case "pdf":
            return <FaFilePdf size={24} />
          case "doc":
          case "docx":
            return <FaFileWord size={24} />
          default:
            return <FaFile size={24} />
        }
      }
  return (
    <Card key={cv.id}>
    <CardContent className="pt-6">
      <div className="flex items-center space-x-4">
        {getFileIcon(cv.cv_filename)}
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{cv.cv_filename}</p>
          <p className="text-sm text-gray-500">
            {new Date(cv.uploaded_at).toLocaleDateString()}
          </p>
          {cv.primary && <p className="text-sm text-blue-500">Par defaut</p>}
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between mt-auto">
      {!cv.primary && (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            par defaut
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
             Etes vous sur de vouloir définir ce CV comme votre CV par défaut?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPrimaryAction.execute({ id: cv.id })}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )}
      <Dialog>
        <DialogTrigger asChild className="ml-auto">
          <Button variant="destructive" size="sm">
            Supprimer
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              Etes vous sur de vouloir supprimer ce CV?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => removeAction.execute({ id: cv.id })}
            >
             Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardFooter>
  </Card>
  )
}

export default CvCard