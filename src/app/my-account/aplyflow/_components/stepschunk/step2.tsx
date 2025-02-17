import { useTimelineStore } from "../../_stores/flow_store";

// components/Step2LetterGeneration.tsx

export const Step2LetterGeneration = () => {
  const { completeStep, currentStep } = useTimelineStore();

  const handleComplete = () => {
    completeStep(1); // Marque l'étape 1 comme terminée
  };

  return (
    <div className="bg-neutral-900 rounded-lg p-6">
      <p className="text-neutral-300">
        Création automatique d'une lettre de motivation personnalisée.
      </p>
      {currentStep === 1 && (
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