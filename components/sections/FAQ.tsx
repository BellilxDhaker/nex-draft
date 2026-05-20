"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const faqs = [
    {
      id: 0,
      question: "What is NexDraft?",
      answer:
        "NexDraft is an AI-powered development platform that helps teams plan, document, and execute projects faster. It generates architecture documentation, creates project roadmaps, and provides semantic search capabilities.",
    },
    {
      id: 1,
      question: "How does NexDraft improve development speed?",
      answer:
        "NexDraft reduces planning time from weeks to days by using AI to generate production-ready architecture, documentation, and project plans. Teams can focus on implementation instead of planning.",
    },
    {
      id: 2,
      question: "Who is NexDraft designed for?",
      answer:
        "NexDraft is perfect for AI developers, indie hackers, startup teams, and enterprises. Whether you're a solo founder or managing a large team, NexDraft scales to your needs.",
    },
    {
      id: 3,
      question: "Can I use NexDraft for enterprise projects?",
      answer:
        "Yes! NexDraft is designed to scale from solo projects to large enterprise applications. We offer enterprise plans with dedicated support and advanced features.",
    },
    {
      id: 4,
      question: "What integrations does NexDraft support?",
      answer:
        "NexDraft integrates with popular development tools including GitHub, VS Code, Slack, and more. We're constantly adding new integrations based on user feedback.",
    },
    {
      id: 5,
      question: "How secure is my data on NexDraft?",
      answer:
        "We take security seriously. All data is encrypted in transit and at rest. We comply with GDPR, SOC 2, and other major security standards.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="py-20 bg-white border-t border-soft">
      <div className="section-container">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div
            className="text-center space-y-4 mb-12"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-primary/60">
              Find answers to common questions about NexDraft
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div className="space-y-4" variants={containerVariants}>
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="border border-soft rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
              >
                <button
                  onClick={() =>
                    setExpandedId(expandedId === faq.id ? null : faq.id)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-bg-light transition-colors"
                >
                  <span className="text-lg font-semibold text-primary text-left">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="w-5 h-5 text-primary/60" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedId === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-bg-light border-t border-soft">
                        <p className="text-primary/70 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            className="mt-12 p-6 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 text-center"
            variants={itemVariants}
          >
            <p className="text-primary/80 mb-4">
              Can't find what you're looking for?
            </p>
            <a
              href="#contact"
              className="inline-block px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
