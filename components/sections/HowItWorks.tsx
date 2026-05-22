"use client";

import { motion } from "framer-motion";
import { Bot, Lightbulb, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Idea Input",
      description:
        "Users describe their startup or application in natural language.",
      icon: Lightbulb,
      color: "from-primary to-accent",
    },
    {
      title: "AI Blueprint Generation",
      description:
        "NexDraft orchestrates specialized AI agents to generate complete engineering documentation.",
      icon: Bot,
      color: "from-accent to-cyan",
    },
    {
      title: "Accelerated Development",
      description:
        "Teams feed outputs directly into Cursor, Windsurf, and AI coding agents.",
      icon: Zap,
      color: "from-cyan to-primary",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Title */}
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Designed for the AI Development Era
            </h2>
            <p className="text-lg text-primary/60 max-w-2xl mx-auto">
              A seamless workflow that transforms ideas into production-ready
              blueprints
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            variants={containerVariants}
          >
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative"
                variants={itemVariants}
                whileHover="cardHover"
                initial="cardRest"
              >
                {/* Step Card */}
                <motion.div
                  className="card-premium h-full relative overflow-hidden group"
                  variants={{
                    cardRest: { y: 0 },
                    cardHover: { y: -8 },
                  }}
                >
                  {/* Download Progress Line - Bottom Edge */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-cyan to-transparent"
                    variants={{
                      cardRest: { scaleX: 0, transformOrigin: "left" },
                      cardHover: { scaleX: 1 },
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Icon Circle */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}
                    variants={{
                      cardRest: { scale: 1, rotate: 0, y: 0 },
                      cardHover: { scale: 1.1, rotate: 5, y: -4 },
                    }}
                  >
                    <motion.div
                      variants={{
                        cardRest: { scale: 1, rotate: 0 },
                        cardHover: { scale: 1.15, rotate: 10 },
                      }}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Number */}
                  <div className="absolute top-4 right-4 text-4xl font-bold text-primary/10">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-primary/60 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
