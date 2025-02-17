import type React from "react"

interface NavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
}

const Navigation: React.FC<NavigationProps> = ({ currentStep, totalSteps, onPrevious, onNext }) => {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className={`px-4 py-2 rounded-md ${
          currentStep === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Précédent
      </button>
      <button
        onClick={onNext}
        disabled={currentStep === totalSteps}
        className={`px-4 py-2 rounded-md ${
          currentStep === totalSteps ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Suivant
      </button>
    </div>
  )
}

export default Navigation

