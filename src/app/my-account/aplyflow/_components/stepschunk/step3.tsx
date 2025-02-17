import { useTimelineStore } from "../../_stores/flow_store";

// components/Step1Description.tsx
export const Step2Description = () => {
    const { completeStep, currentStep } = useTimelineStore();
  
    const handleComplete = () => {
      completeStep(0); // Marque l'étape 0 comme terminée
    };
  
    return (
      <div className="bg-neutral-900 rounded-lg p-6">
        <p className="text-neutral-300">
          Découvrez les détails du poste et les compétences requises.
        </p>
        {currentStep === 0 && (
          <button
            onClick={handleComplete}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Terminer cette étape
          </button>
        )}
      </div>
    );
  };