"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  PenLine,
  Search,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const mockups = {
  search: (
    <div className="space-y-4">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-soft">
        <Search className="h-4 w-4 text-primary/40" />
        <div className="h-2.5 w-40 rounded-full bg-primary/10" />
        <div className="ml-auto flex gap-1">
          <div className="h-5 w-5 rounded bg-accent/10 text-[10px] flex items-center justify-center text-accent font-semibold">
            /
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {[85, 65, 45].map((w, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg"
            animate={{ backgroundColor: ["rgba(79,109,255,0)", "rgba(79,109,255,0.05)", "rgba(79,109,255,0)"] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 1.2 }}
          >
            <div className="h-2 w-2 rounded-full bg-accent/30" />
            <div className="h-2 rounded-full bg-primary/10" style={{ width: `${w}%` }} />
          </motion.div>
        ))}
      </div>
    </div>
  ),
  editing: (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 pb-3 border-b border-soft">
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-primary/20" />
          <div className="w-3 h-3 rounded-full bg-accent/20" />
          <div className="w-3 h-3 rounded-full bg-cyan/20" />
        </div>
        <div className="h-2.5 w-32 rounded-full bg-primary/10 ml-2" />
      </div>
      {[100, 95, 80, 100, 60].map((w, i) => (
        <div
          key={i}
          className={`h-2.5 rounded-full ${i === 2 ? "bg-accent/20" : "bg-primary/10"}`}
          style={{ width: `${w}%` }}
        />
      ))}
      <motion.div
        className="h-2.5 rounded-full bg-accent/30"
        style={{ width: "40%" }}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      {[70, 45].map((w, i) => (
        <div key={i + 5} className="h-2.5 rounded-full bg-primary/10" style={{ width: `${w}%` }} />
      ))}
    </div>
  ),
  versions: (
    <div className="space-y-0">
      {[
        { date: "v3.2.0", active: true, width: 80 },
        { date: "v3.1.0", active: false, width: 65 },
        { date: "v3.0.0", active: false, width: 55 },
        { date: "v2.9.0", active: false, width: 45 },
      ].map((v, i) => (
        <div key={i} className="flex items-start gap-4 pb-5 last:pb-0 relative">
          <div className="flex flex-col items-center">
            <motion.div
              className={`w-3 h-3 rounded-full border-2 ${
                v.active
                  ? "border-accent bg-accent"
                  : "border-primary/20 bg-white"
              }`}
              animate={v.active ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {i < 3 && <div className="w-px h-6 bg-primary/10" />}
          </div>
          <div className="flex-1 pt-0.5">
            <div
              className={`h-3 rounded-full ${v.active ? "bg-accent/15" : "bg-primary/10"}`}
              style={{ width: `${v.width}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  ),
  agents: (
    <div className="flex items-center justify-center h-full py-4">
      <svg viewBox="0 0 200 120" className="w-full h-full">
        <motion.circle
          cx="100" cy="35" r="18"
          fill="rgba(79,109,255,0.12)"
          stroke="rgba(79,109,255,0.3)"
          strokeWidth="2"
          animate={{ r: [18, 22, 18] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <circle cx="45" cy="85" r="14" fill="rgba(42,79,142,0.08)" stroke="rgba(42,79,142,0.2)" strokeWidth="2" />
        <circle cx="155" cy="85" r="14" fill="rgba(102,229,217,0.12)" stroke="rgba(102,229,217,0.3)" strokeWidth="2" />
        <motion.line
          x1="100" y1="53" x2="59" y2="71"
          stroke="rgba(42,79,142,0.1)" strokeWidth="1.5"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.line
          x1="100" y1="53" x2="141" y2="71"
          stroke="rgba(102,229,217,0.15)" strokeWidth="1.5"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
        />
        <line x1="59" y1="85" x2="141" y2="85" stroke="rgba(42,79,142,0.06)" strokeWidth="1" />
        <circle cx="100" cy="35" r="6" fill="rgba(79,109,255,0.3)" />
        <circle cx="45" cy="85" r="4" fill="rgba(42,79,142,0.2)" />
        <circle cx="155" cy="85" r="4" fill="rgba(102,229,217,0.3)" />
      </svg>
    </div>
  ),
  planning: (
    <div className="flex gap-3 h-full py-2">
      {["To Do", "In Progress", "Done"].map((col, ci) => (
        <div key={ci} className="flex-1 rounded-xl bg-primary/[0.03] border border-soft p-2.5">
          <div className="h-2 w-12 rounded-full bg-primary/15 mb-3" />
          {[70, ci === 1 ? 90 : 50, ci === 2 ? 80 : 0]
            .filter((w) => w > 0)
            .slice(0, 2)
            .map((w, i) => (
              <motion.div
                key={i}
                className="h-2.5 rounded-full bg-primary/10 mb-2 last:mb-0"
                style={{ width: `${w}%` }}
                animate={{ backgroundColor: ["rgba(42,79,142,0.1)", "rgba(79,109,255,0.15)", "rgba(42,79,142,0.1)"] }}
                transition={{ duration: 3, repeat: Infinity, delay: ci * 0.5 + i * 0.3 }}
              />
            ))}
        </div>
      ))}
    </div>
  ),
  collaboration: (
    <div className="space-y-4 py-1">
      {[
        { align: "left", width: 70, delay: 0 },
        { align: "right", width: 55, delay: 0.5 },
        { align: "left", width: 80, delay: 1 },
      ].map((msg, i) => (
        <motion.div
          key={i}
          className={`flex items-end gap-3 ${msg.align === "right" ? "flex-row-reverse" : ""}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: msg.delay, duration: 0.5 }}
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${
              msg.align === "left"
                ? "bg-gradient-to-br from-accent/20 to-cyan/20 text-accent"
                : "bg-primary/10 text-primary/50"
            }`}
          >
            {msg.align === "left" ? "JD" : "MK"}
          </div>
          <div
            className={`h-3 rounded-full ${
              msg.align === "left" ? "bg-accent/15" : "bg-primary/10"
            }`}
            style={{ width: `${msg.width}%` }}
          />
        </motion.div>
      ))}
    </div>
  ),
};

const iconMap = {
  Search,
  PenLine,
  BookOpen,
  Target,
  BarChart3,
  Users,
};

export default function FeatureShowcase() {
  const features = [
    {
      title: "Semantic Knowledge Search",
      description:
        "Instantly find relevant information across your entire documentation suite with AI-powered semantic understanding.",
      icon: Search,
      mockup: mockups.search,
      label: "Search",
    },
    {
      title: "AI-Assisted Editing",
      description:
        "Intelligent suggestions and auto-complete powered by large language models to accelerate documentation refinement.",
      icon: PenLine,
      mockup: mockups.editing,
      label: "Editor",
    },
    {
      title: "Versioned Documentation",
      description:
        "Track every change, compare versions, and roll back instantly with built-in version control.",
      icon: BookOpen,
      mockup: mockups.versions,
      label: "Versions",
    },
    {
      title: "Multi-Agent Orchestration",
      description:
        "Specialized AI agents work in concert to generate comprehensive, coherent technical documentation.",
      icon: Target,
      mockup: mockups.agents,
      label: "Orchestrator",
    },
    {
      title: "Intelligent Task Planning",
      description:
        "Automatically break down architecture into actionable development tasks with accurate effort estimation.",
      icon: BarChart3,
      mockup: mockups.planning,
      label: "Planner",
    },
    {
      title: "Collaborative Workspaces",
      description:
        "Real-time collaboration with team members, comments, and discussion threads on every document.",
      icon: Users,
      mockup: mockups.collaboration,
      label: "Workspace",
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
    <section className="py-24 bg-white overflow-hidden">
      <div className="section-container">
        <motion.div
          className="space-y-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Title */}
          <motion.div className="text-center space-y-5" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-soft rounded-full shadow-sm mx-auto"
              whileHover={{ scale: 1.05 }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold text-primary/70">
                Premium capabilities
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary leading-[1.1]">
              <span className="block">Engineered for the</span>
              <span className="block bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
                Modern Stack
              </span>
            </h2>
            <p className="text-lg text-primary/60 max-w-2xl mx-auto leading-relaxed">
              Advanced tools designed for ambitious product teams shipping
              AI-powered experiences.
            </p>
          </motion.div>

          {/* Feature Rows */}
          <motion.div className="space-y-20" variants={containerVariants}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${
                  index % 2 === 1 ? "md:grid-flow-dense" : ""
                }`}
                variants={itemVariants}
              >
                {/* Content */}
                <div
                  className={`space-y-5 ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-cyan/10 ring-1 ring-accent/5">
                      <feature.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-base text-primary/60 leading-relaxed max-w-md">
                    {feature.description}
                  </p>
                </div>

                {/* Mockup Visual */}
                <motion.div
                  className={`${index % 2 === 1 ? "md:order-1" : ""}`}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative rounded-2xl border border-soft bg-white shadow-premium hover:shadow-premium-hover transition-shadow duration-500 overflow-hidden">
                    {/* Mockup header */}
                    <div className="flex items-center gap-2 px-5 py-3 border-b border-soft bg-gradient-to-r from-primary/[0.02] to-accent/[0.02]">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-accent/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan/20" />
                      </div>
                      <div className="flex-1 flex justify-center">
                        <div className="h-5 px-6 rounded-md bg-primary/5 border border-soft flex items-center">
                          <span className="text-[10px] font-medium text-primary/40">
                            {feature.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Mockup content */}
                    <div className="p-5">{feature.mockup}</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
