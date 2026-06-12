"use client";

import { motion } from "framer-motion";
import {
  Bot,
  GitBranch,
  FileText,
  Box,
  BookOpen,
  Puzzle,
  Repeat,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import Link from "next/link";
import MarketingLayout from "@/components/layout/MarketingLayout";
import Pricing from "@/components/sections/Pricing";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const capabilities = [
  { icon: Bot, title: "AI Agents", description: "Specialized autonomous agents that understand your project context and generate precise, actionable documentation." },
  { icon: GitBranch, title: "Multi-Agent Workflows", description: "Orchestrate multiple AI agents working in concert for comprehensive engineering documentation." },
  { icon: FileText, title: "PRD Generation", description: "Transform product ideas into production-ready PRDs with user stories and acceptance criteria." },
  { icon: Box, title: "System Architecture", description: "Generate scalable architecture diagrams, component hierarchies, and deployment strategies." },
  { icon: BookOpen, title: "Technical Documentation", description: "Comprehensive docs covering API contracts, database schemas, and integration guides." },
  { icon: Puzzle, title: "Integrations", description: "Seamlessly connect with GitHub, Slack, VS Code, and 50+ development tools." },
  { icon: Repeat, title: "Workflow Automation", description: "Automate repetitive documentation tasks with custom workflows and AI pipelines." },
];

const benefits = [
  { icon: Zap, title: "10x Faster", description: "Reduce documentation time from days to minutes." },
  { icon: Shield, title: "Enterprise Quality", description: "Consistent, professional documentation at scale." },
  { icon: Users, title: "Team Collaboration", description: "Real-time collaboration and review workflows." },
  { icon: Sparkles, title: "AI-Native", description: "Built for the age of AI-assisted development." },
];

export default function ProductPage() {
  return (
    <MarketingLayout>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="blur-gradient blur-gradient-blue absolute top-20 left-10 w-80 h-80" />
        <div className="blur-gradient blur-gradient-cyan absolute bottom-20 right-10 w-96 h-96" />

        <div className="pointer-events-none absolute inset-0 z-0">
          {[
            { id: "prd", label: "PRD", className: "top-[18%] left-[4%]", delay: 0 },
            { id: "arch", label: "Architecture", className: "top-[30%] right-[6%]", delay: 0.2 },
            { id: "spec", label: "Spec", className: "top-[26%] left-[10%]", delay: 0.4 },
            { id: "tasks", label: "Tasks", className: "top-[55%] left-[10%]", delay: 0.1 },
            { id: "api", label: "API", className: "top-[58%] right-[12%]", delay: 0.3 },
            { id: "agents", label: "Agents", className: "top-[12%] right-[18%]", delay: 0.5 },
          ].map((card) => (
            <motion.div
              key={card.id}
              className={`absolute ${card.className} hidden sm:flex flex-col gap-2 rounded-2xl border border-soft bg-white/70 p-4 shadow-premium backdrop-blur-md`}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, delay: card.delay }}
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-primary/70">
                <FileText className="h-4 w-4 text-primary/50" />
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
            className="text-center max-w-4xl mx-auto space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-soft rounded-full text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4 text-accent" />
                The Complete AI Documentation Platform
              </span>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.05]"
              variants={itemVariants}
            >
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
                Build Better Software
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              From AI-powered documentation to intelligent workflow automation — NexDraft gives
              your team the tools to ship faster with complete engineering clarity.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link href="/auth/login">
                <motion.button
                  className="button-primary px-8 py-4 text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Building Free
                </motion.button>
              </Link>
              <Link href="/docs">
                <motion.button
                  className="button-secondary px-8 py-4 text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read the Docs
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="section-container">
          <motion.div
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center space-y-4" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                Core Capabilities
              </h2>
              <p className="text-lg text-primary/60 max-w-2xl mx-auto">
                Everything your team needs to plan, document, and ship better software
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {capabilities.map((cap) => (
                <motion.div
                  key={cap.title}
                  className="card-premium group"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-accent/10 to-cyan/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <cap.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{cap.title}</h3>
                  <p className="text-sm text-primary/60 leading-relaxed">{cap.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-bg-light">
        <div className="section-container">
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-center space-y-4" variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                Why Teams Choose NexDraft
              </h2>
              <p className="text-lg text-primary/60 max-w-2xl mx-auto">
                Purpose-built for modern engineering teams who demand excellence
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
            >
              {benefits.map((b) => (
                <motion.div
                  key={b.title}
                  className="card-premium text-center"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/10 to-cyan/10 flex items-center justify-center mx-auto mb-4">
                    <b.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{b.title}</h3>
                  <p className="text-sm text-primary/60">{b.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Pricing />

      <section className="relative py-20 bg-white overflow-hidden">
        <div className="blur-gradient blur-gradient-blue absolute top-0 left-0 w-80 h-80 opacity-40" />
        <div className="blur-gradient blur-gradient-cyan absolute bottom-0 right-0 w-96 h-96 opacity-40" />
        <motion.div
          className="section-container relative z-10 text-center max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight"
            variants={itemVariants}
          >
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
              Development Workflow?
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-primary/70 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join thousands of teams using NexDraft to ship better software, faster.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/auth/login">
              <motion.button
                className="button-primary px-8 py-4 text-base inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </MarketingLayout>
  );
}
