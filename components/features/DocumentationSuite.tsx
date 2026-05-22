"use client";

import { motion } from "framer-motion";
import {
  Bot,
  CheckCircle2,
  Database,
  FileText,
  Layers,
  Plug,
  Ruler,
  Settings2,
} from "lucide-react";

export default function DocumentationSuite() {
  const documentTypes = [
    {
      icon: FileText,
      title: "Product Requirements",
      description:
        "Detailed PRDs with user stories, acceptance criteria, and success metrics aligned to business objectives",
    },
    {
      icon: Layers,
      title: "System Architecture",
      description:
        "Scalable, maintainable architecture diagrams with component interactions and deployment strategies",
    },
    {
      icon: Ruler,
      title: "Technical Specifications",
      description:
        "In-depth implementation guides covering technologies, dependencies, and integration points",
    },
    {
      icon: Database,
      title: "Database Design",
      description:
        "Normalized schema designs with relationships, indexing strategies, and performance optimization",
    },
    {
      icon: Plug,
      title: "API Contracts",
      description:
        "Complete API documentation with endpoints, request/response schemas, error handling, and authentication",
    },
    {
      icon: CheckCircle2,
      title: "Development Tasks",
      description:
        "Sprint-ready tickets with estimation, dependencies, acceptance criteria, and testing requirements",
    },
    {
      icon: Bot,
      title: "AI Prompts",
      description:
        "Fine-tuned prompts for code generation, documentation, testing, and architectural decisions",
    },
    {
      icon: Settings2,
      title: "AI Agent Rules",
      description:
        "Governance frameworks and behavioral rules for autonomous development and quality assurance workflows",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-bg-light to-white">
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
              Enterprise-Grade Foundation Before You Code
            </h2>
            <p className="text-lg text-primary/60 max-w-3xl mx-auto">
              Comprehensive, AI-generated documentation suite that spans the
              complete engineering spectrum—from architectural blueprints to
              actionable development tasks, ensuring your team has everything
              needed for success.
            </p>
          </motion.div>

          {/* Document Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {documentTypes.map((doc) => (
              <motion.div
                key={doc.title}
                className="group relative"
                variants={itemVariants}
              >
                <motion.div
                  className="glass rounded-2xl p-6 h-full flex flex-col items-center text-center cursor-pointer"
                  whileHover={{
                    y: -12,
                    boxShadow: "0 20px 40px rgba(42, 79, 142, 0.15)",
                  }}
                >
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <motion.div
                    className="mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    <doc.icon className="h-11 w-11 text-primary" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {doc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-primary/70 leading-relaxed">
                    {doc.description}
                  </p>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary via-accent to-cyan group-hover:border-opacity-100 transition-all duration-300 opacity-0 group-hover:opacity-20" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
