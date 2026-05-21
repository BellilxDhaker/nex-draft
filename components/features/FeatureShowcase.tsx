"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  PenLine,
  Search,
  Target,
  Users,
} from "lucide-react";

export default function FeatureShowcase() {
  const features = [
    {
      title: "Semantic Knowledge Search",
      description:
        "Instantly find relevant information across your entire documentation suite with AI-powered semantic understanding.",
      icon: Search,
      position: "left",
    },
    {
      title: "AI-Assisted Editing",
      description:
        "Intelligent suggestions and auto-complete powered by large language models to accelerate documentation refinement.",
      icon: PenLine,
      position: "right",
    },
    {
      title: "Versioned Documentation",
      description:
        "Track every change, compare versions, and roll back instantly with built-in version control.",
      icon: BookOpen,
      position: "left",
    },
    {
      title: "Multi-Agent Orchestration",
      description:
        "Specialized AI agents work in concert to generate comprehensive, coherent technical documentation.",
      icon: Target,
      position: "right",
    },
    {
      title: "Intelligent Task Planning",
      description:
        "Automatically break down architecture into actionable development tasks with accurate effort estimation.",
      icon: BarChart3,
      position: "left",
    },
    {
      title: "Collaborative Workspaces",
      description:
        "Real-time collaboration with team members, comments, and discussion threads on every document.",
      icon: Users,
      position: "right",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <motion.div
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Title */}
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Premium Features for Modern Development
            </h2>
            <p className="text-lg text-primary/60 max-w-2xl mx-auto">
              Enterprise-grade capabilities designed for ambitious teams
            </p>
          </motion.div>

          {/* Features */}
          <motion.div className="space-y-20" variants={containerVariants}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                  feature.position === "right" ? "md:grid-flow-dense" : ""
                }`}
                variants={itemVariants}
              >
                {/* Content */}
                <motion.div
                  className="space-y-4"
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{
                    opacity: 0,
                    x: feature.position === "left" ? -30 : 30,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <feature.icon className="h-9 w-9 text-primary" />
                    <h3 className="text-2xl md:text-3xl font-bold text-primary">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-lg text-primary/60 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>

                {/* Visual Placeholder */}
                <motion.div
                  className="h-64 md:h-80 bg-gradient-to-br from-primary/5 via-accent/5 to-cyan/5 rounded-2xl border border-soft flex items-center justify-center"
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <feature.icon className="h-16 w-16 text-primary/30" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
