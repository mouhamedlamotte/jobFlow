import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"


export function CVSelection({ onNext }: { onNext: () => void }) {
  const cvs = [
    { id: 1, name: "CV Professionnel" },
    { id: 2, name: "CV Créatif" },
    { id: 3, name: "CV Technique" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choix du CV</CardTitle>
        <CardDescription>Sélectionnez le CV que vous souhaitez utiliser</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cvs.map((cv) => (
            <Card key={cv.id} className="cursor-pointer hover:bg-gray-100">
              <CardHeader>
                <CardTitle className="text-lg">{cv.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gray-200 flex items-center justify-center">CV Preview</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onNext}>Passer à létape suivante</Button>
      </CardFooter>
    </Card>
  )
}

