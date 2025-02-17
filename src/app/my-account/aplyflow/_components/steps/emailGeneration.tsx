import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"

export function EmailGeneration({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Génération de l'email</CardTitle>
        <CardDescription>Votre email de candidature généré</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">Objet : Candidature pour le poste de développeur Full Stack</p>
        <p className="text-gray-700 mb-4">
          Bonjour, Je vous écris pour exprimer mon vif intérêt pour le poste de développeur Full Stack au sein de votre
          entreprise. J'ai joint à cet email mon CV ainsi qu'une lettre de motivation détaillant mes compétences et mon
          expérience. Je serais ravi d'avoir l'opportunité de discuter plus en détail de ma candidature lors d'un
          entretien. Cordialement, [Votre nom]
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onNext}>Passer à l'étape suivante</Button>
      </CardFooter>
    </Card>
  )
}

