'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const footerSections = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Security', 'Roadmap', 'Updates'],
    },
    {
      title: 'Platform',
      links: ['Integrations', 'API', 'Documentation', 'Status Page'],
    },
    {
      title: 'Resources',
      links: ['Blog', 'Guides', 'Community', 'Support'],
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Security Policy'],
    },
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-white border-t border-soft">
      <div className="section-container">
        {/* Footer Content */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {footerSections.map((section) => (
            <motion.div
              key={section.title}
              className="space-y-4"
              variants={itemVariants}
            >
              <h3 className="font-semibold text-primary">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary/60 hover:text-primary transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-soft pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo and Copyright */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">ND</span>
            </div>
            <div>
              <p className="font-semibold text-primary">NexDraft</p>
              <p className="text-xs text-primary/60">
                Intelligent Drafting for the AI Development Era.
              </p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-6"
            variants={containerVariants}
          >
            {[
              { icon: '𝕏', label: 'Twitter' },
              { icon: '🔗', label: 'LinkedIn' },
              { icon: '🐙', label: 'GitHub' },
              { icon: '💬', label: 'Discord' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href="#"
                className="text-primary/60 hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.2 }}
              >
                <span className="text-lg">{social.icon}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Copyright */}
        <motion.p
          className="text-center text-xs text-primary/40 mt-8 pb-8"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          © 2024 NexDraft, Inc. All rights reserved. • Made with ❤️ for developers
        </motion.p>
      </div>
    </footer>
  );
}
