import type React from "react"

const Step5: React.FC = () => {
  const templates = [
    { id: 1, name: "Template Classique" },
    { id: 2, name: "Template Moderne" },
    { id: 3, name: "Template Créatif" },
    { id: 4, name: "Template Minimaliste" },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Choix du template de lettre</h2>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="border p-4 rounded-md hover:bg-blue-50 cursor-pointer">
            <h3 className="font-semibold">{template.name}</h3>
            <p className="text-sm text-gray-600">Aperçu du template</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Step5

