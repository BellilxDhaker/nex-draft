"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Compass,
  GraduationCap,
  FileText,
  BarChart3,
  GitCompare,
  Sparkles,
  ArrowRight,

} from "lucide-react";
import Link from "next/link";
import MarketingLayout from "@/components/layout/MarketingLayout";

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

const categories = [
  { icon: BookOpen, label: "Blog", description: "Insights and updates from the NexDraft team", count: "12+ articles" },
  { icon: Compass, label: "Guides", description: "In-depth guides to master the platform", count: "8+ guides" },
  { icon: GraduationCap, label: "Tutorials", description: "Step-by-step walkthroughs for common tasks", count: "6+ tutorials" },
  { icon: FileText, label: "Templates", description: "Pre-built templates to accelerate your work", count: "10+ templates" },
  { icon: BarChart3, label: "Case Studies", description: "Real teams using NexDraft in production", count: "4+ studies" },
  { icon: GitCompare, label: "Changelog", description: "Latest features, fixes, and improvements", count: "Always current" },
];

export default function ResourcesPage() {
  return (
    <MarketingLayout>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="blur-gradient blur-gradient-blue absolute top-20 left-10 w-80 h-80" />
        <div className="blur-gradient blur-gradient-cyan absolute bottom-20 right-10 w-96 h-96" />

        <div className="pointer-events-none absolute inset-0 z-0">
          {[
            { id: "blog", label: "Blog", className: "top-[18%] left-[4%]", delay: 0 },
            { id: "guides", label: "Guides", className: "top-[30%] right-[6%]", delay: 0.2 },
            { id: "tuts", label: "Tutorials", className: "top-[26%] left-[10%]", delay: 0.4 },
            { id: "tmpl", label: "Templates", className: "top-[55%] left-[10%]", delay: 0.1 },
            { id: "cases", label: "Case Studies", className: "top-[58%] right-[12%]", delay: 0.3 },
            { id: "changes", label: "Changelog", className: "top-[12%] right-[18%]", delay: 0.5 },
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
                <BookOpen className="h-4 w-4 text-accent" />
                Resource Center
              </span>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.05]"
              variants={itemVariants}
            >
              Learn, Build, and{" "}
              <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
                Grow with NexDraft
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Explore guides, tutorials, templates, and insights to get the most
              out of your NexDraft platform.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
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
                Browse by Category
              </h2>
              <p className="text-lg text-primary/60 max-w-2xl mx-auto">
                Find the resources you need to succeed with NexDraft
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {categories.map((cat) => (
                <motion.div
                  key={cat.label}
                  className="card-premium group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-accent/10 to-cyan/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <cat.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-1">{cat.label}</h3>
                  <p className="text-sm text-primary/60 leading-relaxed mb-3">
                    {cat.description}
                  </p>
                  <span className="text-xs font-semibold text-accent">{cat.count}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 bg-white overflow-hidden border-t border-soft">
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
            Stay Updated with{" "}
            <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
              NexDraft
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-primary/70 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Get the latest guides, tutorials, and product updates delivered to your inbox.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            variants={itemVariants}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-soft bg-bg-light text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
            />
            <motion.button
              className="button-primary px-6 py-3 text-sm whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </MarketingLayout>
  );
}
