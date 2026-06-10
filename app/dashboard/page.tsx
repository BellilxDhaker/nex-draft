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
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useUser } from "@/lib/hooks";
import { getProjects, Project } from "@/lib/projects";
import { getSubscription, Subscription } from "@/lib/subscriptions";
import { getPlanDetails } from "@/lib/plans";

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
  const { user, loading: userLoading } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [subLoading, setSubLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => {})
      .finally(() => setProjectsLoading(false));

    getSubscription()
      .then(setSubscription)
      .catch(() => {})
      .finally(() => setSubLoading(false));
  }, []);

  const isLoading = userLoading || projectsLoading || subLoading;

  const recentProjects = projects.slice(0, 5);
  const projectCount = projects.length;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const activeCount = projects.filter(
    (p) => new Date(p.updated_at) > thirtyDaysAgo,
  ).length;
  const domainsCount = new Set(
    projects.map((p) => p.domain).filter(Boolean),
  ).size;
  const plan = subscription?.plan || user?.plan || "FREE";
  const planDetails = getPlanDetails(plan);
  const isPremium = plan === "PRO" || plan === "ENTERPRISE";
  const subStatus = subscription?.status || "active";

  const notifications = recentProjects.map((p) => ({
    id: p.id,
    message: `Created "${p.title}"`,
    time: timeAgo(new Date(p.created_at)),
  }));

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
      label: "Total Projects",
      value: String(projectCount),
      icon: Folder,
      colorClasses: { bg: "bg-blue-100", text: "text-blue-600" },
    },
    {
      label: "Active (30d)",
      value: String(activeCount),
      icon: Activity,
      colorClasses: { bg: "bg-green-100", text: "text-green-600" },
    },
    {
      label: "Domains",
      value: String(domainsCount),
      icon: Globe,
      colorClasses: { bg: "bg-purple-100", text: "text-purple-600" },
    },
    {
      label: "Plan",
      value: planDetails.name,
      icon: isPremium ? Star : User,
      colorClasses: isPremium
        ? { bg: "bg-yellow-100", text: "text-yellow-600" }
        : { bg: "bg-gray-100", text: "text-gray-600" },
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
                <p className="text-gray-500 mt-1">
                  {user
                    ? `Welcome back${user.firstName ? `, ${user.firstName}` : ""}`
                    : "Welcome back to your workspace"}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Link href="/create">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    New Project
                  </motion.button>
                </Link>

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
                      className="bg-white rounded-xl p-6 border border-soft shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-sm font-medium">
                            {stat.label}
                          </p>

                          <p className="text-3xl font-bold text-primary mt-2">
                            {isLoading ? (
                              <span className="inline-block w-12 h-8 bg-gray-200 rounded animate-pulse" />
                            ) : (
                              stat.value
                            )}
                          </p>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
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
                  <div className="bg-white rounded-xl border border-soft overflow-hidden shadow-sm">
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

                    {isLoading ? (
                      <div className="p-6 space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-3 bg-gray-200 rounded w-1/4" />
                          </div>
                        ))}
                      </div>
                    ) : recentProjects.length === 0 ? (
                      <div className="p-12 text-center">
                        <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                          No projects yet
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Create your first project to get started
                        </p>
                        <Link href="/create">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-accent text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-accent-light transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Create Project
                          </motion.button>
                        </Link>
                      </div>
                    ) : (
                      <div className="divide-y divide-soft">
                        {recentProjects.map((project, index) => (
                          <Link key={project.id} href={`/projects/${project.id}`}>
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ backgroundColor: "#f7f9fc" }}
                              className="px-6 py-4 cursor-pointer transition-colors"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-gray-900">
                                    {project.title}
                                  </h3>
                                  {project.domain && (
                                    <p className="text-sm text-gray-500 mt-0.5">
                                      {project.domain}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {timeAgo(new Date(project.created_at))}
                                </span>
                                {project.goals && (
                                  <span className="flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                    Has goals
                                  </span>
                                )}
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Templates */}
                  <div className="bg-white rounded-xl border border-soft overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-soft flex items-center justify-between">
                      <h2 className="text-xl font-bold text-primary">
                        Quick Templates
                      </h2>

                      <Link href="/projects/new">
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
                    className="bg-gradient-to-br from-accent to-accent-light rounded-xl p-6 text-white shadow-lg"
                  >
                    <Sparkles className="w-8 h-8 mb-3" />

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

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl border border-soft overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-soft">
                      <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activity
                      </h3>
                    </div>

                    {isLoading ? (
                      <div className="p-6 space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse space-y-1">
                            <div className="h-3 bg-gray-200 rounded w-full" />
                            <div className="h-2 bg-gray-200 rounded w-1/4" />
                          </div>
                        ))}
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Activity className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">
                          No recent activity
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Create a project to see activity here
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-soft">
                        {notifications.map((notif, index) => (
                          <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-6 py-4 hover:bg-bg-light transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 bg-blue-100 rounded-full mt-0.5">
                                <FileText className="w-3.5 h-3.5 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {notif.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {notif.time}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Subscription */}
                  <div className="bg-white rounded-xl border border-soft overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-soft">
                      <h3 className="text-lg font-bold text-primary">
                        Subscription
                      </h3>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">
                            {planDetails.name} Plan
                          </p>

                          <p className="text-sm text-gray-500">
                            {subStatus === "canceled"
                              ? "Subscription canceled"
                              : isPremium
                                ? "All features unlocked"
                                : "Upgrade for more"}
                          </p>
                        </div>

                        {isPremium ? (
                          <div className="p-2 bg-yellow-100 rounded-lg">
                            <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                          </div>
                        ) : (
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Lock className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {subscription?.current_period_end && isPremium && (
                        <p className="text-xs text-gray-500 mb-4">
                          Current period ends{" "}
                          {new Date(
                            subscription.current_period_end,
                          ).toLocaleDateString()}
                        </p>
                      )}

                      <div className="space-y-3 text-sm">
                        {planDetails.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-gray-700"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            {feature}
                          </div>
                        ))}

                        <div className="flex items-center gap-2 text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          {planDetails.requestLimit === Infinity
                            ? "Unlimited requests"
                            : `${planDetails.requestLimit.toLocaleString()} requests/mo`}
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          {planDetails.storageLimit === Infinity
                            ? "Unlimited storage"
                            : `${planDetails.storageLimit}GB storage`}
                        </div>
                      </div>

                      {subStatus === "canceled" ? (
                        <Link href="/settings">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full mt-6 bg-accent text-white font-medium py-2.5 rounded-lg hover:bg-accent-light transition-colors"
                          >
                            Resubscribe
                          </motion.button>
                        </Link>
                      ) : isPremium ? (
                        <Link href="/settings">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full mt-6 bg-accent/10 hover:bg-accent/20 text-accent font-medium py-2.5 rounded-lg transition-colors"
                          >
                            Manage Subscription
                          </motion.button>
                        </Link>
                      ) : (
                        <Link href="/settings">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full mt-6 bg-accent text-white font-medium py-2.5 rounded-lg hover:bg-accent-light transition-colors"
                          >
                            Upgrade to Pro
                          </motion.button>
                        </Link>
                      )}
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
