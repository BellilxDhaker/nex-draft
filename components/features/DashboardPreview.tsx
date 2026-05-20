'use client';

import { motion } from 'framer-motion';

export default function DashboardPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
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
          <motion.div
            className="text-center space-y-4"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              The NexDraft Platform
            </h2>
            <p className="text-lg text-primary/60 max-w-2xl mx-auto">
              Sophisticated, intelligent workspace for generating production-ready engineering blueprints
            </p>
          </motion.div>

          {/* Dashboard Container */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            {/* Outer Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-cyan/20 blur-3xl rounded-3xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Main Dashboard Card */}
            <motion.div
              className="relative bg-white rounded-3xl border border-soft shadow-premium-lg overflow-hidden"
              whileHover={{ boxShadow: '0 40px 80px rgba(42, 79, 142, 0.2)' }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-soft px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="font-semibold text-primary">NexDraft Dashboard</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-cyan/60" />
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <motion.div
                  className="md:col-span-1 space-y-2"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <div className="h-8 bg-primary/10 rounded-lg" />
                  <div className="h-8 bg-primary/10 rounded-lg" />
                  <div className="h-8 bg-accent/10 rounded-lg" />
                  <div className="h-8 bg-primary/10 rounded-lg" />
                </motion.div>

                {/* Main Content */}
                <motion.div
                  className="md:col-span-3 space-y-6"
                  animate={{ opacity: [1, 0.8, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                  {/* Editor Area */}
                  <div className="space-y-3">
                    <div className="h-6 bg-primary/5 rounded w-1/3" />
                    <div className="h-4 bg-primary/5 rounded w-full" />
                    <div className="h-4 bg-primary/5 rounded w-full" />
                    <div className="h-4 bg-primary/5 rounded w-2/3" />
                  </div>

                  {/* Activity Panels */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-4 border border-soft"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="text-xs font-semibold text-primary/60 mb-2">AI Processing</div>
                      <div className="space-y-1">
                        <div className="h-2 bg-primary/20 rounded-full w-3/4" />
                        <div className="h-2 bg-accent/20 rounded-full w-1/2" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-gradient-to-br from-cyan/5 to-primary/5 rounded-lg p-4 border border-soft"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                    >
                      <div className="text-xs font-semibold text-primary/60 mb-2">Documents</div>
                      <div className="space-y-1">
                        <div className="h-2 bg-cyan/20 rounded-full w-full" />
                        <div className="h-2 bg-accent/20 rounded-full w-4/5" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
