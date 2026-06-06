"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { createProject } from "@/lib/projects";

export default function NewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [domain, setDomain] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const isValid = title.trim().length > 0;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isCreating) return;

    setIsCreating(true);
    setError("");

    try {
      const project = await createProject({
        title: title.trim(),
        context: context.trim(),
        domain: domain.trim(),
      });
      router.push(`/projects/${project.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex h-screen bg-bg-light">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          className="bg-white border-b border-soft sticky top-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/projects")}
                className="p-2 rounded-lg hover:bg-bg-light transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  New Project
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Give your project a name to get started
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <form onSubmit={handleCreate} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}

                <div className="bg-white rounded-2xl p-8 border border-soft shadow-premium space-y-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <Lightbulb className="w-4 h-4 text-accent" />
                      Project Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Mobile Grocery Delivery Platform"
                      className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm"
                      autoFocus
                      required
                    />
                    <p className="text-xs text-gray-400">
                      A clear, descriptive name for your project
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      Context{" "}
                      <span className="text-xs font-normal text-gray-400">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder="Describe your project background, existing systems, tech preferences..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      Domain{" "}
                      <span className="text-xs font-normal text-gray-400">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="e.g., E-commerce, Healthcare, FinTech"
                      className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={isValid ? { scale: 1.02 } : {}}
                    whileTap={isValid ? { scale: 0.98 } : {}}
                    type="submit"
                    disabled={!isValid || isCreating}
                    className={`flex items-center gap-2 font-semibold py-3 px-6 rounded-xl transition-all text-sm ${
                      isValid && !isCreating
                        ? "bg-gradient-to-r from-accent to-accent-light text-white shadow-md hover:shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Project
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
