"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  FolderOpen,
  Clock,
  Sparkles,
  ArrowRight,
  Trash2,
  Edit3,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { getProjects, deleteProject, type Project } from "@/lib/projects";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch {
      // redirect to login if not authenticated
      router.replace("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (deletingId) return;
    setDeletingId(id);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      // silently fail
    } finally {
      setDeletingId(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="flex h-screen bg-bg-light">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg border-b border-soft sticky top-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary">Projects</h1>
                <p className="text-gray-500 mt-1">
                  Manage your engineering projects
                </p>
              </div>

              <Link href="/create">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-accent to-accent-light text-white font-semibold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
              </div>
            ) : projects.length === 0 ? (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-light/20 flex items-center justify-center mb-6"
                >
                  <FolderOpen className="w-10 h-10 text-accent" />
                </motion.div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  No projects yet
                </h3>
                <p className="text-gray-500 mb-8 max-w-md">
                  Create your first project to start generating engineering artifacts with AI.
                </p>
                <Link href="/create">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-accent to-accent-light text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Project
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              /* Projects Grid */
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    onClick={() => router.push(`/projects/${project.id}`)}
                    className="bg-white rounded-2xl border border-soft shadow-premium hover:shadow-premium-hover transition-all cursor-pointer group overflow-hidden"
                  >
                    {/* Top accent gradient */}
                    <div className="h-2 bg-gradient-to-r from-accent via-accent-light to-accent" />

                    <div className="p-6">
                      {/* Title row */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent/20 to-accent-light/20 flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-accent" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-gray-900 leading-snug">
                            {project.title}
                          </h3>
                          {project.domain && (
                            <span className="inline-block mt-1 text-xs font-medium text-accent bg-accent/5 px-2 py-0.5 rounded-md">
                              {project.domain}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details preview */}
                      <div className="space-y-3 mb-4">
                        {project.context && (
                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                            {project.context}
                          </p>
                        )}
                        {(project.target_users ||
                          project.goals ||
                          project.constraints) && (
                          <div className="flex gap-2 flex-wrap">
                            {project.target_users?.split("\n").filter(Boolean).length > 0 && (
                              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-100">
                                {project.target_users.split("\n").filter(Boolean).length} user groups
                              </span>
                            )}
                            {project.goals?.split("\n").filter(Boolean).length > 0 && (
                              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-100">
                                {project.goals.split("\n").filter(Boolean).length} goals
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-soft">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDate(project.updated_at)}
                        </div>

                        <div className="flex items-center gap-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/projects/${project.id}`);
                            }}
                            className="p-1.5 rounded-lg hover:bg-bg-light text-gray-400 hover:text-accent transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleDelete(project.id, e)}
                            disabled={deletingId === project.id}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            {deletingId === project.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
