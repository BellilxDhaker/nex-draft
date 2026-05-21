"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for indie developers and small teams",
      highlighted: false,
      features: [
        "100 AI document generations/month",
        "5 projects",
        "Basic AI assistance",
        "Document templates",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$99",
      period: "/month",
      description: "For growing teams and ambitious startups",
      highlighted: true,
      features: [
        "Unlimited AI document generations",
        "Unlimited projects",
        "Advanced AI agent rules",
        "Semantic document chat",
        "System design diagrams",
        "Advanced exports",
        "Team collaboration",
        "Priority AI processing",
        "24/7 support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with custom needs",
      highlighted: false,
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "Advanced security",
        "On-premise options",
        "Custom training",
      ],
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
    <section id="pricing" className="py-20 bg-white">
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
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-primary/60 max-w-2xl mx-auto">
              Choose the plan that fits your team. All plans include a 14-day
              free trial.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                className="relative"
                variants={itemVariants}
              >
                {/* Highlighted Plan Glow */}
                {plan.highlighted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent/30 to-cyan/30 rounded-2xl blur-xl"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}

                {/* Card */}
                <motion.div
                  className={`relative rounded-2xl p-8 h-full flex flex-col border ${
                    plan.highlighted
                      ? "bg-white border-2 border-accent shadow-premium-lg"
                      : "bg-white border border-soft shadow-premium"
                  }`}
                  whileHover={{
                    y: -12,
                    boxShadow: plan.highlighted
                      ? "0 40px 80px rgba(79, 109, 255, 0.25)"
                      : "0 20px 40px rgba(42, 79, 142, 0.15)",
                  }}
                >
                  {/* Badge for Pro */}
                  {plan.highlighted && (
                    <motion.div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent to-cyan text-white px-4 py-1 rounded-full text-sm font-semibold"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      RECOMMENDED
                    </motion.div>
                  )}

                  {/* Plan Name and Price */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-primary/60 mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">
                        {plan.price}
                      </span>
                      <span className="text-primary/60">{plan.period}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all duration-200 ${
                      plan.highlighted ? "button-primary" : "button-secondary"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Start Free"}
                  </motion.button>

                  {/* Features List */}
                  <div className="space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <motion.div
                        key={feature}
                        className="flex items-start gap-3"
                        whileHover={{ x: 4 }}
                      >
                        <Check className="h-4 w-4 text-cyan mt-1" />
                        <span className="text-primary/70 text-sm">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
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
