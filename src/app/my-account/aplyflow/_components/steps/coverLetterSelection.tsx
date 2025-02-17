import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"

export function CoverLetterGeneration({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Génération de la lettre de motivation</CardTitle>
        <CardDescription>Votre lettre de motivation générée</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">
          Cher recruteur, Je suis très enthousiaste à lidée de postuler au poste de développeur Full Stack au sein de
          votre entreprise. Avec mon expérience en React et Node.js, ainsi que ma passion pour le développement web, je
          suis convaincu de pouvoir apporter une contribution significative à votre équipe.
        </p>
        <p className="text-gray-700 mb-4">
          Au cours de ma carrière, jai travaillé sur divers projets utilisant des architectures microservices et jai
          une solide expérience avec les bases de données SQL et NoSQL. De plus, ma familiarité avec les méthodologies
          Agile me permet de mintégrer rapidement dans des équipes dynamiques.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onNext}>Passer à létape suivante</Button>
      </CardFooter>
    </Card>
  )
}

