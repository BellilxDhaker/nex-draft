"use client";
import { motion } from "framer-motion";
import { FileText, Users, Zap, CheckCircle } from "lucide-react";

export default function SocialProof() {
  const stats = [
    { value: "50K+", label: "Documents Generated", icon: FileText },
    { value: "12K+", label: "Developers", icon: Users },
    { value: "4K+", label: "Projects Planned", icon: Zap },
    { value: "99.9%", label: "Workflow Accuracy", icon: CheckCircle },
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-12 bg-white border-t border-soft">
      <div className="section-container">
        {/* Text Section */}
        <motion.div
          className="text-center space-y-3 max-w-2xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-primary"
            variants={itemVariants}
          >
            Powering AI Developers Worldwide
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-primary/70 leading-relaxed"
            variants={itemVariants}
          >
            Join AI developers, Vibe coders, and indie hackers who use NexDraft
            to accelerate their development process
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="card-premium text-center"
              variants={statsVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(42, 79, 142, 0.15)",
              }}
            >
              <motion.div
                className="flex justify-center mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </motion.div>
              <motion.div
                className="text-3xl md:text-4xl font-bold text-gradient mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-sm md:text-base text-primary/60 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
