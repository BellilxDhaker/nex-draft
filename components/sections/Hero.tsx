"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function Hero() {
  const floatingDocuments = [
    { label: "PRD.md", delay: 0 },
    { label: "SYSTEM-DESIGN.md", delay: 0.1 },
    { label: "TECH-SPEC.md", delay: 0.2 },
    { label: "TASKS.md", delay: 0.3 },
    { label: "PROMPTS.md", delay: 0.4 },
  ];

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

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-bg-light via-bg-white to-white pt-24 pb-12 overflow-hidden">
      {/* Background Blurs */}
      <div className="blur-gradient blur-gradient-blue absolute top-20 left-10 w-80 h-80" />
      <div className="blur-gradient blur-gradient-cyan absolute bottom-20 right-10 w-96 h-96" />

      <div className="section-container relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-soft rounded-full w-fit"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-primary">
                Powered by Autonomous AI Agents
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="gradient-text-hero leading-[1.2]"
              variants={itemVariants}
            >
              From Product Idea to Engineering Blueprint.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-primary/70 leading-relaxed max-w-lg"
              variants={itemVariants}
            >
              NexDraft generates production-ready PRDs, system architectures,
              technical specifications, AI prompts, and implementation plans in
              minutes — designed for modern AI-assisted development workflows.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
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

          {/* Right - Hero Visual */}
          <motion.div
            className="relative h-96 md:h-[500px]"
            variants={itemVariants}
          >
            {/* Dashboard Card Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white to-bg-light rounded-3xl border border-soft shadow-premium-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Floating Documents */}
            {floatingDocuments.map((doc, i) => (
              <motion.div
                key={doc.label}
                className="absolute glass rounded-lg px-4 py-2 text-xs font-mono text-primary"
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 6 + i * 0.5,
                  repeat: Infinity,
                  delay: doc.delay,
                }}
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 15}%`,
                }}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary/70" />
                  <span>{doc.label}</span>
                </div>
              </motion.div>
            ))}

            {/* AI Activity Feed */}
            <motion.div
              className="absolute bottom-6 left-6 right-6 glass rounded-xl p-4 space-y-3"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 7, repeat: Infinity, delay: 0.3 }}
            >
              <div className="text-xs font-semibold text-primary/80">
                AI Activity
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-xs text-primary/60">
                    Generating PRD...
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan rounded-full" />
                  <span className="text-xs text-primary/60">
                    System Design ready
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
