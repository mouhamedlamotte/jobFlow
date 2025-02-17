import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"

import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group"
import { Label } from "@/app/_components/ui/label"

export function TemplateSelection({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choix des templates de lettre</CardTitle>
        <CardDescription>Sélectionnez un template pour votre lettre de motivation</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="template1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="template1" id="template1" />
            <Label htmlFor="template1">Template Classique</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="template2" id="template2" />
            <Label htmlFor="template2">Template Moderne</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="template3" id="template3" />
            <Label htmlFor="template3">Template Créatif</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={onNext}>Passer à l'étape suivante</Button>
      </CardFooter>
    </Card>
  )
}

