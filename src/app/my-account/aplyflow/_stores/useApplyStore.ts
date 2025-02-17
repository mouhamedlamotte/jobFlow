import { create } from "zustand"

type State = {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export const useApplyStore = create<State>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
}))

