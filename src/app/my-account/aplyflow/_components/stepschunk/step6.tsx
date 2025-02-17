import type React from "react"

const Step6: React.FC = () => {
  const cvs = [
    { id: 1, name: "CV Principal" },
    { id: 2, name: "CV Alternatif" },
    { id: 3, name: "CV Spécialisé" },
    { id: 4, name: "CV International" },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Choix du CV</h2>
      <div className="grid grid-cols-2 gap-4">
        {cvs.map((cv) => (
          <div key={cv.id} className="border p-4 rounded-md hover:bg-blue-50 cursor-pointer">
            <h3 className="font-semibold">{cv.name}</h3>
            <p className="text-sm text-gray-600">Aperçu du CV</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Step6

