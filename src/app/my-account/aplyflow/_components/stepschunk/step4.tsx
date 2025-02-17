import type React from "react"

const Step4: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Modification du contenu</h2>
      <textarea
        className="w-full h-64 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue="Cher recruteur,

Je suis très intéressé par le poste de [Titre du poste] au sein de votre entreprise. Avec mon expérience en [Domaine], je suis convaincu de pouvoir apporter une contribution significative à votre équipe.

[Contenu généré de la lettre de motivation...]

Je vous remercie de l'attention que vous porterez à ma candidature et reste à votre disposition pour un entretien.

Cordialement,
[Nom du candidat]"
      ></textarea>
    </div>
  )
}

export default Step4

