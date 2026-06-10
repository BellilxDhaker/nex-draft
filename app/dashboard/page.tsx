"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Star,
  Plus,
  FileText,
  User,
  Folder,
  Activity,
  Globe,
  Clock,
  Lock,
  Sparkles,
  CheckCircle2,
  Presentation,
  Share2,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Dashboard() {
  const notifications = [
    {
      id: "1",
      message: "AI finished generating your restaurant menu",
      time: "2 minutes ago",
    },
    {
      id: "2",
      message: "Sarah commented on Product Presentation",
      time: "1 hour ago",
    },
    {
      id: "3",
      message: "Your PDF export is ready to download",
      time: "3 hours ago",
    },
  ];

  const recentProjects = [
    {
      id: "1",
      title: "Restaurant Menu Design",
      category: "Design",
      lastEdited: "2 hours ago",
      status: "In Progress",
      progress: 78,
    },
    {
      id: "2",
      title: "Social Media Campaign",
      category: "Marketing",
      lastEdited: "Yesterday",
      status: "Completed",
      progress: 100,
    },
    {
      id: "3",
      title: "Investor Pitch Deck",
      category: "Presentation",
      lastEdited: "3 days ago",
      status: "Draft",
      progress: 35,
    },
  ];

  const TemplateIcon = ({ name }: { name: string }) => {
    switch (name) {
      case "PRD Doc":
        return <FileText className="w-8 h-8 text-blue-600" />;
      case "Menu Design":
        return <ImageIcon className="w-8 h-8 text-purple-600" />;
      case "Pitch Deck":
        return <Presentation className="w-8 h-8 text-green-600" />;
      case "Social Post":
        return <Share2 className="w-8 h-8 text-orange-600" />;
      default:
        return <FileText className="w-8 h-8 text-gray-600" />;
    }
  };

  const templates = [
    { id: "1", name: "PRD Doc", category: "Document", premium: false },
    { id: "2", name: "Menu Design", category: "Design", premium: true },
    { id: "3", name: "Pitch Deck", category: "Presentation", premium: false },
    { id: "4", name: "Social Post", category: "Social", premium: true },
  ];

  const stats = [
    {
      label: "Projects",
      value: "24",
      icon: FileText,
      colorClasses: {
        bg: "bg-blue-100",
        text: "text-blue-600",
      },
    },
    {
      label: "AI Generations",
      value: "148",
      icon: Cpu,
      colorClasses: {
        bg: "bg-cyan-100",
        text: "text-cyan-600",
      },
    },
    {
      label: "Downloads",
      value: "89",
      icon: Download,
      colorClasses: {
        bg: "bg-green-100",
        text: "text-green-600",
      },
    },
    {
      label: "Subscription",
      value: "Pro",
      icon: Star,
      colorClasses: {
        bg: "bg-yellow-100",
        text: "text-yellow-600",
      },
    },
  ];

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back to your workspace
                </p>
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 hover:bg-bg-light rounded-lg transition-colors"
                >
                  <Bell className="w-6 h-6 text-primary" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </motion.button>

                <Link href="/settings">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 hover:bg-bg-light rounded-lg transition-colors"
                  >
                    <User className="w-6 h-6 text-primary" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;

                  return (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-lg p-6 border border-soft shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">
                            {stat.label}
                          </p>

                          <p className="text-2xl font-bold text-primary mt-2">
                            {stat.value}
                          </p>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`p-3 rounded-lg ${stat.colorClasses.bg}`}
                        >
                          <IconComponent
                            className={`w-6 h-6 ${stat.colorClasses.text}`}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side */}
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-2 space-y-6"
                >
                  {/* Recent Projects */}
                  <div className="bg-white rounded-lg border border-soft overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-soft flex items-center justify-between">
                      <h2 className="text-xl font-bold text-primary">
                        Recent Projects
                      </h2>

                      <Link href="/projects">
                        <motion.button
                          whileHover={{ gap: "8px" }}
                          className="flex items-center gap-2 text-accent hover:text-accent-light transition-colors text-sm font-medium"
                        >
                          View All
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </Link>
                    </div>

                    <div className="divide-y divide-soft">
                      {recentProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ backgroundColor: "#f7f9fc" }}
                          className="px-6 py-4 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {project.title}
                              </h3>

                              <p className="text-sm text-gray-600">
                                {project.category}
                              </p>
                            </div>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                project.status === "In Progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : project.status === "Draft"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-accent to-accent-light h-2 rounded-full"
                                  style={{
                                    width: `${project.progress}%`,
                                  }}
                                />
                              </div>
                            </div>

                            <span className="text-xs text-gray-600 font-medium">
                              {project.progress}%
                            </span>
                          </div>

                          <p className="text-xs text-gray-500 mt-3">
                            Last edited {project.lastEdited}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Templates */}
                  <div className="bg-white rounded-lg border border-soft overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-soft flex items-center justify-between">
                      <h2 className="text-xl font-bold text-primary">
                        Quick Templates
                      </h2>

                      <Link href="/projects">
                        <motion.button
                          whileHover={{ gap: "8px" }}
                          className="flex items-center gap-2 text-accent hover:text-accent-light transition-colors text-sm font-medium"
                        >
                          Browse All
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
                      {templates.map((template, index) => (
                        <motion.div
                          key={template.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ y: -5 }}
                          className="bg-bg-light rounded-lg p-4 border border-soft cursor-pointer hover:border-accent transition-colors text-center"
                        >
                          <div className="mb-3 flex justify-center">
                            <TemplateIcon name={template.name} />
                          </div>

                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {template.name}
                          </h3>

                          <p className="text-xs text-gray-500 mt-1">
                            {template.category}
                          </p>

                          {template.premium && (
                            <div className="mt-2 flex justify-center">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right Side */}
                <motion.div variants={itemVariants} className="space-y-6">
                  {/* Create New */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-accent to-accent-light rounded-lg p-6 text-white shadow-lg"
                  >
                    <Plus className="w-8 h-8 mb-3" />

                    <h3 className="text-lg font-bold mb-2">
                      Create Something New
                    </h3>

                    <p className="text-sm text-white/90 mb-4">
                      Start a new project with AI assistance
                    </p>

                    <Link href="/create">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 rounded-lg transition-all border border-white/30 backdrop-blur-sm"
                      >
                        Get Started
                      </motion.button>
                    </Link>
                  </motion.div>

                  {/* Notifications */}
                  <div className="bg-white rounded-lg border border-soft overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-soft">
                      <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notifications
                      </h3>
                    </div>

                    <div className="divide-y divide-soft">
                      {notifications.map((notif, index) => (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-6 py-4 hover:bg-bg-light transition-colors"
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {notif.message}
                          </p>

                          <p className="text-xs text-gray-600 mt-1">
                            {notif.time}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Subscription */}
                  <div className="bg-white rounded-lg border border-soft overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-soft">
                      <h3 className="text-lg font-bold text-primary">
                        Subscription Status
                      </h3>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            Pro Plan
                          </p>

                          <p className="text-sm text-gray-600">
                            Unlimited AI generations
                          </p>
                        </div>

                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                      </div>

                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-accent" />
                          AI-powered generation
                        </div>

                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4 text-accent" />
                          Unlimited exports
                        </div>

                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-accent" />
                          Private workspace
                        </div>

                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-accent" />
                          Advanced analytics
                        </div>
                      </div>

                      <Link href="/settings">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full mt-6 bg-accent/10 hover:bg-accent/20 text-accent font-medium py-2 rounded-lg transition-colors"
                        >
                          Manage Subscription
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
