"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Building2,
  Briefcase,
  ClipboardList,
  Code2,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
} from "lucide-react";
import Link from "next/link";
import MarketingLayout from "@/components/layout/MarketingLayout";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const audiences = [
  {
    id: "startups",
    icon: Rocket,
    title: "Startups",
    subtitle: "Move fast without breaking things",
    painPoints: [
      "Limited engineering bandwidth for documentation",
      "Need to move from idea to MVP rapidly",
      "Maintaining quality while shipping quickly",
    ],
    solution:
      "NexDraft helps startups generate comprehensive technical documentation in minutes, not weeks. Go from product idea to engineering blueprint in a single session, enabling your small team to move at the speed of a large organization.",
    features: [
      "Rapid PRD generation for investor-ready specs",
      "AI-powered architecture design for scalable MVPs",
      "Automated technical documentation suite",
      "Integration with GitHub and Linear",
    ],
    gradient: "from-primary to-accent",
  },
  {
    id: "saas",
    icon: Building2,
    title: "SaaS Companies",
    subtitle: "Scale your documentation infrastructure",
    painPoints: [
      "Documentation sprawl across multiple products",
      "Keeping docs in sync with rapid releases",
      "Onboarding new engineers efficiently",
    ],
    solution:
      "NexDraft provides a centralized documentation platform that grows with your SaaS. Automatically generate, update, and maintain documentation across all your products and services, ensuring your team always has accurate, up-to-date specs.",
    features: [
      "Multi-product documentation management",
      "Auto-synced API documentation",
      "Versioned release notes and changelogs",
      "Team collaboration and review workflows",
    ],
    gradient: "from-accent to-cyan",
  },
  {
    id: "agencies",
    icon: Briefcase,
    title: "Agencies",
    subtitle: "Deliver faster with professional deliverables",
    painPoints: [
      "Inconsistent documentation across projects",
      "Time-consuming manual documentation process",
      "Need for professional client-facing deliverables",
    ],
    solution:
      "NexDraft standardizes your agency's documentation workflow. Deliver consistent, high-quality technical specs, architecture diagrams, and project plans to clients in record time, setting your agency apart from the competition.",
    features: [
      "Branded, client-ready documentation templates",
      "Rapid project scoping and proposal generation",
      "Consistent deliverables across all projects",
      "Reusable architecture patterns and components",
    ],
    gradient: "from-cyan to-primary",
  },
  {
    id: "pm",
    icon: ClipboardList,
    title: "Product Managers",
    subtitle: "Bridge vision and execution seamlessly",
    painPoints: [
      "Difficulty translating product vision to engineering specs",
      "Communication gaps between product and engineering",
      "Tracking feature requirements across sprints",
    ],
    solution:
      "NexDraft empowers PMs to create detailed, engineering-ready specifications without writing code. Transform product requirements into comprehensive technical documentation that engineers can execute on immediately.",
    features: [
      "Natural language to technical spec conversion",
      "User story mapping with acceptance criteria",
      "Requirement traceability across documents",
      "Stakeholder-friendly visual dashboards",
    ],
    gradient: "from-primary to-accent",
  },
  {
    id: "developers",
    icon: Code2,
    title: "Developers",
    subtitle: "Code with complete specifications",
    painPoints: [
      "Incomplete or outdated specifications",
      "Time spent writing and maintaining docs",
      "Context switching between coding and documenting",
    ],
    solution:
      "NexDraft integrates directly into your development workflow, generating and updating documentation as you code. Focus on building while NexDraft handles the documentation, from API specs to system architecture.",
    features: [
      "VS Code extension for inline documentation",
      "Auto-generated API references from code",
      "Architecture diagrams from your codebase",
      "Git-integrated documentation updates",
    ],
    gradient: "from-accent to-cyan",
  },
  {
    id: "enterprise",
    icon: Shield,
    title: "Enterprise Teams",
    subtitle: "Governance and compliance at scale",
    painPoints: [
      "Meeting compliance and regulatory requirements",
      "Maintaining documentation standards across orgs",
      "Onboarding large teams efficiently",
    ],
    solution:
      "NexDraft Enterprise provides the governance, security, and scalability that large organizations require. Maintain documentation standards, meet compliance requirements, and keep thousands of engineers aligned.",
    features: [
      "RBAC and audit logging for compliance",
      "Custom documentation standards enforcement",
      "SSO, SAML, and enterprise auth integration",
      "Dedicated support and SLA guarantees",
    ],
    gradient: "from-cyan to-primary",
  },
];

export default function SolutionsPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="blur-gradient blur-gradient-blue absolute top-20 left-10 w-80 h-80" />
        <div className="blur-gradient blur-gradient-cyan absolute bottom-20 right-10 w-96 h-96" />

        <div className="pointer-events-none absolute inset-0 z-0">
          {[
            { id: "startup", label: "Startup", className: "top-[18%] left-[4%]", delay: 0 },
            { id: "enterprise", label: "Enterprise", className: "top-[30%] right-[6%]", delay: 0.2 },
            { id: "agency", label: "Agency", className: "top-[26%] left-[10%]", delay: 0.4 },
            { id: "saas", label: "SaaS", className: "top-[55%] left-[10%]", delay: 0.1 },
            { id: "dev", label: "Dev Team", className: "top-[58%] right-[12%]", delay: 0.3 },
            { id: "pm", label: "PM", className: "top-[12%] right-[18%]", delay: 0.5 },
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
                Tailored Solutions for Every Team
              </span>
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.05]"
              variants={itemVariants}
            >
              Built for{" "}
              <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
                Modern Product Teams
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Whether you are a startup founder, product manager, or enterprise
              engineering leader — NexDraft adapts to your workflow and scales
              with your team.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <motion.div
            className="space-y-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {audiences.map((audience, index) => (
              <motion.div
                key={audience.id}
                id={audience.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
                variants={itemVariants}
              >
                <div
                  className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                >
                  <div
                    className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${audience.gradient} text-white text-sm font-semibold`}
                  >
                    <audience.icon className="h-4 w-4" />
                    {audience.title}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                    {audience.subtitle}
                  </h3>

                  {/* Pain Points */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-primary/50 uppercase tracking-wider">
                      Common Challenges
                    </p>
                    <ul className="space-y-2">
                      {audience.painPoints.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-primary/70"
                        >
                          <div className="h-5 w-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="h-2 w-2 rounded-full bg-red-400" />
                          </div>
                          <span className="text-primary/60">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solution */}
                  <div className="p-5 rounded-xl bg-gradient-to-br from-accent/5 to-cyan/5 border border-accent/10">
                    <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                      How NexDraft Helps
                    </p>
                    <p className="text-primary/80 leading-relaxed">
                      {audience.solution}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {audience.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-primary/70"
                      >
                        <CheckCircle2 className="h-5 w-5 text-cyan flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  className={`h-72 lg:h-96 rounded-2xl bg-gradient-to-br ${audience.gradient}/10 border border-soft flex items-center justify-center ${
                    index % 2 === 1 ? "lg:col-start-1" : ""
                  }`}
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: index * 0.15,
                  }}
                >
                  <audience.icon className="h-24 w-24 text-primary/20" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-b from-white to-bg-light overflow-hidden">
        <div className="blur-gradient blur-gradient-blue absolute top-0 right-0 w-80 h-80 opacity-40" />
        <div className="blur-gradient blur-gradient-cyan absolute bottom-0 left-0 w-96 h-96 opacity-40" />
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
              Documentation Workflow?
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-primary/70 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            See how NexDraft can be tailored to your team's specific needs.
            Start your free trial today.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link href="/auth/login">
              <motion.button
                className="button-primary px-8 py-4 text-base inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </Link>
            <Link href="/product">
              <motion.button
                className="button-secondary px-8 py-4 text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Features
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </MarketingLayout>
  );
}
