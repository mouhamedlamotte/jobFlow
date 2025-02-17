import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"


export function SendApplication() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Envoi de la candidature</CardTitle>
        <CardDescription>Vérifiez et envoyez votre candidature</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">
          Votre candidature est prête à être envoyée. Veuillez vérifier une dernière fois tous les éléments :
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Lettre de motivation</li>
          <li>CV sélectionné</li>
          <li>Email de candidature</li>
        </ul>
        <p className="text-gray-700">
          Une fois que vous êtes satisfait, cliquez sur le bouton "Envoyer la candidature" ci-dessous.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Envoyer la candidature</Button>
      </CardFooter>
    </Card>
  )
}

