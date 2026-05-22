"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const floatingCards = [
    {
      id: "prd",
      label: "PRD",
      className: "top-[16%] left-[6%]",
      delay: 0,
    },
    {
      id: "system",
      label: "System",
      className: "top-[32%] right-[8%]",
      delay: 0.2,
    },
    {
      id: "spec",
      label: "Spec",
      className: "top-[25%] left-[12%]",
      delay: 0.4,
    },
    {
      id: "tasks",
      label: "Tasks",
      className: "top-[58%] left-[12%]",
      delay: 0.1,
    },
    {
      id: "prompts",
      label: "Prompts",
      className: "top-[60%] right-[14%]",
      delay: 0.3,
    },
    { id: "qa", label: "QA", className: "top-[14%] right-[20%]", delay: 0.5 },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-bg-light via-bg-white to-white pt-24 pb-16 overflow-hidden">
      {/* Background Blurs */}
      <div className="blur-gradient blur-gradient-blue absolute top-20 left-10 w-80 h-80" />
      <div className="blur-gradient blur-gradient-cyan absolute bottom-20 right-10 w-96 h-96" />

      <div className="pointer-events-none absolute inset-0 z-0">
        {floatingCards.map((card) => (
          <motion.div
            key={card.id}
            className={`absolute ${card.className} hidden sm:flex flex-col gap-2 rounded-2xl border border-soft bg-white/70 p-4 shadow-premium backdrop-blur-md`}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: card.delay }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-primary/70">
              <FileText className="h-6 w-4 text-primary/50" />
              {card.label}
            </div>
            <div className="space-y-1">
              <div className="h-2 w-20 rounded-full bg-primary/10" />
              <div className="h-2 w-16 rounded-full bg-primary/10" />
              <div className="h-2 w-12 rounded-full bg-primary/10" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-soft rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-primary">
                Autonomous AI agents for product teams
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.05]"
              variants={itemVariants}
            >
              <span className="block">From Product Idea.</span>
              <span className="block bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
                To Engineering Blueprint.
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-primary/70 leading-relaxed max-w-2xl mx-auto"
              variants={itemVariants}
            >
              NexDraft generates production-ready PRDs, system architectures,
              technical specifications, AI prompts, and implementation plans in
              minutes for modern AI-assisted development workflows.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.button
                className="button-primary px-8 py-4 text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Building
              </motion.button>
              <motion.button
                className="button-secondary px-8 py-4 text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
