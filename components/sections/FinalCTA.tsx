'use client';

import { motion } from 'framer-motion';

export default function FinalCTA() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="blur-gradient blur-gradient-blue absolute top-0 left-0 w-80 h-80 opacity-40" />
      <div className="blur-gradient blur-gradient-cyan absolute bottom-0 right-0 w-96 h-96 opacity-40" />

      <motion.div
        className="section-container relative z-10 text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main Headline */}
        <motion.h2
          className="gradient-text-hero mb-6"
          variants={itemVariants}
        >
          Build software with complete engineering clarity.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          className="text-xl md:text-2xl text-primary/70 mb-12 leading-relaxed"
          variants={itemVariants}
        >
          Generate the blueprint before writing the code. Start your free trial today and experience the future of AI-native development.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.button
            className="button-primary px-8 py-4 text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
          </motion.button>
          <motion.button
            className="button-secondary px-8 py-4 text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Demo
          </motion.button>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2 text-sm text-primary/60"
          variants={itemVariants}
        >
          <span>✓</span>
          <span>14-day free trial • No credit card required • Cancel anytime</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
