"use client";

import { motion } from "framer-motion";
import { ChevronRight, Zap, Sparkles, Image, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

type CategoryColor = "accent" | "accent-light" | "cyan";

type CategoryType = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: CategoryColor;
  templates: {
    id: string;
    name: string;
    description: string;
  }[];
};

const colorClasses: Record<
  CategoryColor,
  {
    bg: string;
    text: string;
  }
> = {
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
  },
  "accent-light": {
    bg: "bg-accent-light/10",
    text: "text-accent-light",
  },
  cyan: {
    bg: "bg-cyan/10",
    text: "text-cyan",
  },
};

export default function CreatePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: CategoryType[] = useMemo(() => [], []);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const selectedCategoryData = categories.find(
    (c) => c.id === selectedCategory,
  );

  return (
    <div className="flex h-screen bg-bg-light">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          className="bg-white border-b border-soft sticky top-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-primary">
              Create New Project
            </h1>

            <p className="text-gray-600 mt-2">
              Choose a template and let AI guide you through creation
            </p>
          </div>
        </motion.div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {!selectedCategory ? (
                <>
                  {/* Category Selection */}
                  <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Select Category
                    </h2>

                    {categories.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-soft bg-white p-6 text-center text-sm text-gray-600">
                        No categories are available yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category, index) => {
                          const IconComponent = category.icon;

                          const colors = colorClasses[category.color];

                          return (
                            <motion.div
                              key={category.id}
                              initial={{
                                opacity: 0,
                                y: 20,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                delay: index * 0.05,
                              }}
                              whileHover={{
                                y: -8,
                              }}
                              onClick={() => setSelectedCategory(category.id)}
                              className="bg-white rounded-lg p-6 border border-soft cursor-pointer hover:border-accent hover:shadow-lg transition-all group"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <motion.div
                                  whileHover={{
                                    scale: 1.1,
                                  }}
                                  className={`p-3 rounded-lg ${colors.bg}`}
                                >
                                  <IconComponent
                                    className={`w-6 h-6 ${colors.text}`}
                                  />
                                </motion.div>

                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
                              </div>

                              <h3 className="text-lg font-bold text-gray-900 mb-1">
                                {category.name}
                              </h3>

                              <p className="text-sm text-gray-600">
                                {category.description}
                              </p>

                              <p className="text-xs text-accent mt-3 font-medium">
                                {category.templates.length} templates
                              </p>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>

                  {/* AI Features */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-accent/10 to-accent-light/10 rounded-lg p-6 border border-accent/20"
                  >
                    <div className="flex items-start gap-4">
                      <Zap className="w-6 h-6 text-accent flex-shrink-0 mt-1" />

                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">
                          AI-Powered Creation Flow
                        </h3>

                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>✓ Intelligent template recommendations</li>
                          <li>✓ AI-assisted content generation</li>
                          <li>✓ Real-time suggestions & optimization</li>
                          <li>✓ Professional quality outputs</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Template Selection */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <motion.button
                      whileHover={{
                        gap: "8px",
                      }}
                      onClick={() => setSelectedCategory(null)}
                      className="flex items-center gap-2 text-accent hover:text-accent-light text-sm font-medium mb-6"
                    >
                      ← Back to Categories
                    </motion.button>

                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Choose a Template
                      </h2>

                      <p className="text-gray-600">
                        {selectedCategoryData?.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {selectedCategoryData?.templates.map(
                        (template, index) => (
                          <motion.div
                            key={template.id}
                            initial={{
                              opacity: 0,
                              y: 20,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              delay: index * 0.1,
                            }}
                            whileHover={{
                              y: -5,
                            }}
                            className="bg-white rounded-lg p-6 border border-soft hover:border-accent cursor-pointer hover:shadow-md transition-all group"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                  {template.name}
                                </h3>

                                <p className="text-sm text-gray-600 mt-1">
                                  {template.description}
                                </p>
                              </div>

                              <motion.div
                                whileHover={{
                                  scale: 1.1,
                                }}
                                className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors"
                              >
                                <ArrowRight className="w-5 h-5 text-accent" />
                              </motion.div>
                            </div>

                            <motion.button
                              whileHover={{
                                scale: 1.02,
                              }}
                              whileTap={{
                                scale: 0.98,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="w-full mt-4 bg-accent hover:bg-accent-light text-white font-medium py-2 rounded-lg transition-colors"
                            >
                              Create with This
                            </motion.button>
                          </motion.div>
                        ),
                      )}
                    </div>

                    {/* Preview */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.2,
                      }}
                      className="bg-white rounded-lg p-8 border border-soft text-center"
                    >
                      <Image className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />

                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Template Preview
                      </h3>

                      <p className="text-gray-600 mb-6">
                        Select a template to see a live preview and start
                        creating
                      </p>

                      <motion.button
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        className="bg-gradient-to-r from-accent to-accent-light text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg transition-all"
                      >
                        Start with AI Assistant
                        <Sparkles className="w-4 h-4 inline ml-2" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
