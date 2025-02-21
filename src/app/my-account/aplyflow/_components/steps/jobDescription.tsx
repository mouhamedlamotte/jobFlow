import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"

export function JobDescription({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description de loffre</CardTitle>
        <CardDescription>Voici les détails de loffre demploi</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">
          Nous recherchons un développeur Full Stack passionné pour rejoindre notre équipe dynamique. Le candidat idéal
          aura une solide expérience en développement web, avec une expertise particulière en React et Node.js.
        </p>
        <p className="text-gray-700 mb-4">
          Compétences requises : - Maîtrise de JavaScript, React, et Node.js - Expérience avec les bases de données SQL
          et NoSQL - Connaissance des principes de larchitecture microservices - Familiarité avec les méthodologies
          Agile
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onNext}>Passer à létape suivante</Button>
      </CardFooter>
    </Card>
  )
}

