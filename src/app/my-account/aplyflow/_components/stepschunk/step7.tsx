import type React from "react"

const Step7: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Récapitulatif de la candidature</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Poste</h3>
          <p className="text-gray-700">[Titre du poste]</p>
        </div>
        <div>
          <h3 className="font-semibold">Lettre de motivation</h3>
          <p className="text-gray-700">Template Moderne</p>
        </div>
        <div>
          <h3 className="font-semibold">CV</h3>
          <p className="text-gray-700">CV Principal</p>
        </div>
      </div>
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
        Envoyer la candidature
      </button>
    </div>
  )
}

export default Step7

