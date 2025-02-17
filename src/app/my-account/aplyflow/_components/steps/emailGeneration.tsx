import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"

export function EmailGeneration({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Génération de lemail</CardTitle>
        <CardDescription>Votre email de candidature généré</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">Objet : Candidature pour le poste de développeur Full Stack</p>
        <p className="text-gray-700 mb-4">
          Bonjour, Je vous écris pour exprimer mon vif intérêt pour le poste de développeur Full Stack au sein de votre
          entreprise. Jai joint à cet email mon CV ainsi quune lettre de motivation détaillant mes compétences et mon
          expérience. Je serais ravi davoir lopportunité de discuter plus en détail de ma candidature lors dun
          entretien. Cordialement, [Votre nom]
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onNext}>Passer à létape suivante</Button>
      </CardFooter>
    </Card>
  )
}

