"use client"


import { motion, AnimatePresence } from "framer-motion"
import { useApplyStore } from "./_stores/useApplyStore"
import { JobDescription } from "./_components/steps/jobDescription"
import { CoverLetterGeneration } from "./_components/steps/coverLetterSelection"
import { EmailGeneration } from "./_components/steps/emailGeneration"
import { UserModification } from "./_components/steps/userModifications"
import { TemplateSelection } from "./_components/steps/templateSelection"
import { CVSelection } from "./_components/steps/cvSelection"
import { SendApplication } from "./_components/steps/sendApplication"
import { Timeline } from "./_components/timeline"

const steps = [
  { id: 1, component: JobDescription },
  { id: 2, component: CoverLetterGeneration },
  { id: 3, component: EmailGeneration },
  { id: 4, component: UserModification },
  { id: 5, component: TemplateSelection },
  { id: 6, component: CVSelection },
  { id: 7, component: SendApplication },
]

export default function ApplyFlow() {
  const { currentStep, setCurrentStep } = useApplyStore()

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="flex">
      {/* Timeline */}
      <div className="w-[300px]  border-gray-800 hidden lg:block">
        <Timeline currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent onNext={handleNext} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

