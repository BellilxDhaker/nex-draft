'use client';

import { motion } from 'framer-motion';

export default function DocumentationSuite() {
  const documentTypes = [
    { icon: '📋', title: 'Product Requirements', description: 'Comprehensive PRDs' },
    { icon: '🏗️', title: 'System Architecture', description: 'Scalable designs' },
    { icon: '📐', title: 'Technical Specifications', description: 'Detailed specs' },
    { icon: '🗄️', title: 'Database Design', description: 'Schema & structure' },
    { icon: '🔌', title: 'API Contracts', description: 'OpenAPI specs' },
    { icon: '✓', title: 'Development Tasks', description: 'Sprint ready' },
    { icon: '🤖', title: 'AI Prompts', description: 'Optimized prompts' },
    { icon: '⚙️', title: 'AI Agent Rules', description: 'Agent behaviors' },
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
          <motion.div
            className="text-center space-y-4"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Everything required before a single line of code.
            </h2>
            <p className="text-lg text-primary/60 max-w-2xl mx-auto">
              Generated documentation suite that covers the complete engineering spectrum
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
                    boxShadow: '0 20px 40px rgba(42, 79, 142, 0.15)',
                  }}
                >
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <motion.div
                    className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    {doc.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {doc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-primary/60">
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
