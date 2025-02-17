"use client"

import { motion } from "framer-motion"
import { Briefcase, FileText, Mail, Edit, Layout, FileCheck, Send } from "lucide-react"

const steps = [
  { id: 1, title: "Description de l'offre", icon: Briefcase },
  { id: 2, title: "Génération de la lettre", icon: FileText },
  { id: 3, title: "Génération d'email", icon: Mail },
  { id: 4, title: "Modification par l'utilisateur", icon: Edit },
  { id: 5, title: "Choix des templates de lettre", icon: Layout },
  { id: 6, title: "Choix du CV", icon: FileCheck },
  { id: 7, title: "Envoi", icon: Send },
]

interface TimelineProps {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export function Timeline({ currentStep, setCurrentStep }: TimelineProps) {
  return (
    <div className="relative h-full py-10 px-4">
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500/20 via-blue-500/40 to-blue-500/20" />

      {/* Glowing Line Overlay */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-blue-500 to-transparent"
        initial={{ height: "0%" }}
        animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.5 }}
      />

      {/* Steps */}
      <div className="relative space-y-24">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className={`relative flex cursor-pointer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            onClick={() => setCurrentStep(step.id)}
          >
            {/* Node */}
            <motion.div
              className={`absolute left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full hover:scale-110
                ${
                  step.id === currentStep
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg shadow-blue-500/50"
                    : step.id < currentStep
                      ? "bg-blue-500/80"
                      : "bg-gray-700"
                }`}
            >
              <step.icon className={`h-6 w-6 ${step.id <= currentStep ? "text-white" : "text-gray-400"}`} />

              {/* Glow Effect */}
              {step.id === currentStep && (
                <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/50 blur-md" />
              )}
            </motion.div>

            {/* Label */}
            <motion.span
              className={`absolute left-[calc(50%+3rem)] top-1/2 -translate-y-1/2 text-sm font-medium
                ${step.id <= currentStep ? "text-white" : "text-gray-500"}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 + 0.1 }}
            >
              {step.title}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

