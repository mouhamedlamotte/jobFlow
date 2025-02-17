"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Briefcase, FileText, Mail, Edit, Layout, FileCheck, Send } from "lucide-react";
import { Step1Description } from "../_components/stepschunk/step1";
import { Step2LetterGeneration } from "../_components/stepschunk/step2";
import { useTimelineStore } from "../_stores/flow_store";

// Importez les autres composants d'étapes ici...

interface TimelineEntry {
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

export const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const { currentStep, completedSteps } = useTimelineStore();

  useEffect(() => {
    console.log("completedSteps", completedSteps);
    
  }, [completedSteps]);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Données pour le timeline
  const timelineData: TimelineEntry[] = [
    {
      title: "Description de l'offre",
      icon: Briefcase,
      content: <Step1Description />,
    },
    {
      title: "Génération de la lettre",
      icon: FileText,
      content: <Step2LetterGeneration />,
    },
    // Ajoutez les autres étapes ici...
  ];

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div className="max-w-7xl mx-auto relative">
        <div ref={ref} className="relative pl-12 py-10">
          {/* Timeline Line */}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute left-6 top-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-700 to-transparent"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-blue-500 to-purple-500"
            />
          </div>

          {/* Timeline Items */}
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-20"
              style={{ display: index <= currentStep ? "block" : "none" }} // Afficher uniquement les étapes jusqu'à l'étape actuelle
            >
              <div className="relative flex items-center mb-4">
                {/* Node */}
                <div className="absolute -left-9 w-8 h-8 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-blue-500" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-neutral-200 ml-4">{item.title}</h3>
              </div>

              {/* Content */}
              {!completedSteps.includes(index) && ( // Afficher le contenu uniquement si l'étape n'est pas terminée
                <div className="ml-4">{item.content}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;