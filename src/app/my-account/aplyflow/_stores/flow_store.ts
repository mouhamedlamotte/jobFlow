// stores/useTimelineStore.ts
import { create } from "zustand";

interface TimelineState {
  currentStep: number;
  completedSteps: number[];
  setCurrentStep: (step: number) => void;
  completeStep: (step: number) => void;
}

export const useTimelineStore = create<TimelineState>((set) => ({
  currentStep: 0,
  completedSteps: [],
  setCurrentStep: (step) => set({ currentStep: step }),
  completeStep: (step) =>
    set((state) => ({
      currentStep: state.currentStep + 1,
      completedSteps: [...state.completedSteps, step],
    })),
}));