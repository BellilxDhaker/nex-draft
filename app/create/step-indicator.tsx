"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  { label: "Product Spec", href: "/create", icon: "target", subtitle: "Define the scope and boundaries of your project" },
  { label: "Project Details", href: "/create/spec", icon: "lightbulb", subtitle: "Tell us about your project idea and background" },
  { label: "Select Agent", href: "/create/agent", icon: "sparkles", subtitle: "Choose a specialized AI agent for generation" },
  { label: "Result", href: "/create/result", icon: "filetext", subtitle: "View your generated engineering artifact" },
];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step.href} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.95,
                  backgroundColor: isCompleted
                    ? "rgb(79, 109, 255)"
                    : isActive
                      ? "rgba(79, 109, 255, 0.1)"
                      : "rgb(243, 244, 246)",
                  borderColor: isActive
                    ? "rgb(79, 109, 255)"
                    : isCompleted
                      ? "rgb(79, 109, 255)"
                      : "rgb(229, 231, 235)",
                  color: isCompleted
                    ? "white"
                    : isActive
                      ? "rgb(79, 109, 255)"
                      : "rgb(156, 163, 175)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-shadow ${
                  isActive ? "shadow-glow" : ""
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                ) : (
                  index + 1
                )}
              </motion.div>
              <motion.span
                initial={false}
                animate={{
                  color: isActive
                    ? "rgb(42, 79, 142)"
                    : isCompleted
                      ? "rgb(79, 109, 255)"
                      : "rgb(156, 163, 175)",
                  fontWeight: isActive ? 600 : 400,
                }}
                className="text-xs mt-1.5 whitespace-nowrap hidden sm:block"
              >
                {step.label}
              </motion.span>
            </div>

            {index < steps.length - 1 && (
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: index < currentStep
                    ? "rgb(79, 109, 255)"
                    : "rgb(229, 231, 235)",
                }}
                className="w-10 md:w-16 h-0.5 mx-2 md:mx-3 mt-0 rounded-full"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
