import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"
import { Textarea } from "@/app/_components/ui/textarea"

export function UserModification({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modification par l'utilisateur</CardTitle>
        <CardDescription>Apportez vos modifications à la lettre et à l'email</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="cover-letter" className="block text-sm font-medium text-gray-700 mb-1">
              Lettre de motivation
            </label>
            <Textarea
              id="cover-letter"
              rows={5}
              defaultValue="Cher recruteur, Je suis très enthousiaste à l'idée de postuler..."
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Textarea
              id="email"
              rows={5}
              defaultValue="Objet : Candidature pour le poste de développeur Full Stack..."
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onNext}>Passer à l'étape suivante</Button>
      </CardFooter>
    </Card>
  )
}

