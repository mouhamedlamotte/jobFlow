import { create } from "zustand"

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone?: string
}

interface EmailConfig {
  type: "smtp" | "resend"
  service?: string
  server?: string
  port?: string
  email?: string
  password?: string
  apiKey?: string
}

interface FinalPreferences {
  portfolioUrl?: string
  defaultTemplate: string
}

interface OnboardingState {
  step: number
  name: string
  skipable: boolean
  personalInfo: PersonalInfo | null
  cvFile: File | null
  emailConfig: EmailConfig | null
  finalPreferences: FinalPreferences | null
  setStep: (step: number) => void
  setPersonalInfo: (info: PersonalInfo) => void
  setCvFile: (file: File) => void
  setEmailConfig: (config: EmailConfig) => void
  setFinalPreferences: (prefs: FinalPreferences) => void
  completeOnboarding: () => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 4,
  name: "Personal Information",
  skipable: false,
  personalInfo: null,
  cvFile: null,
  emailConfig: null,
  finalPreferences: null,
  setStep: (step) =>
    set((state) => ({
      step,
      name: getStepName(step),
      skipable: step > 1 && step < 4,
    })),
  setPersonalInfo: (info) => set({ personalInfo: info }),
  setCvFile: (file) => set({ cvFile: file }),
  setEmailConfig: (config) => set({ emailConfig: config }),
  setFinalPreferences: (prefs) => set({ finalPreferences: prefs }),
  completeOnboarding: () => {
    // Here you would typically send the collected data to your backend
    console.log("Onboarding completed")
    // Redirect to dashboard or show a success message
  },
}))

function getStepName(step: number): string {
  switch (step) {
    case 1:
      return "Personal Information"
    case 2:
      return "Upload CV"
    case 3:
      return "Email Configuration"
    case 4:
      return "Finalisation"
    default:
      return ""
  }
}

