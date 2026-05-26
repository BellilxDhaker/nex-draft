"use client";

import { motion } from "framer-motion";
import { CheckCircle, Filter, Calendar } from "lucide-react";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

type ActivityType = "edit" | "ai" | "comment" | "export" | "share";

interface Activity {
  id: number;
  type: ActivityType;
  user: string;
  action: string;
  target: string;
  time: string;
  timestamp: Date;
  icon: any;
  color: string;
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<string>("all");

  const activities: Activity[] = [];

  const filteredActivities =
    filter === "all" ? activities : activities.filter((a) => a.type === filter);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "accent":
        return {
          bg: "bg-accent/10",
          border: "border-accent",
          text: "text-accent",
        };

      case "accent-light":
        return {
          bg: "bg-accent-light/10",
          border: "border-accent-light",
          text: "text-accent-light",
        };

      case "cyan":
        return {
          bg: "bg-cyan-100",
          border: "border-cyan-500",
          text: "text-cyan-500",
        };

      case "green":
        return {
          bg: "bg-green-100",
          border: "border-green-500",
          text: "text-green-500",
        };

      default:
        return {
          bg: "bg-gray-100",
          border: "border-gray-400",
          text: "text-gray-500",
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
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
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-primary">Activity</h1>

            <p className="text-gray-600 mt-1">
              Timeline of your projects and collaborations
            </p>
          </div>
        </motion.div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />

                <span className="text-sm font-medium text-gray-700">
                  Filter by:
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "All Activities" },
                  { value: "edit", label: "Edits" },
                  { value: "ai", label: "AI Generations" },
                  { value: "export", label: "Exports" },
                  { value: "share", label: "Sharing" },
                  { value: "comment", label: "Comments" },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(option.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filter === option.value
                        ? "bg-accent text-white shadow-md"
                        : "bg-white border border-soft text-gray-700 hover:border-accent"
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Activity Timeline */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredActivities.length === 0 ? (
                <div className="rounded-lg border border-dashed border-soft bg-white p-6 text-center text-sm text-gray-600">
                  No activity yet.
                </div>
              ) : (
                filteredActivities.map((activity, index) => {
                  const IconComponent = activity.icon;
                  const colors = getColorClasses(activity.color);

                  return (
                    <motion.div
                      key={activity.id}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      className="bg-white rounded-lg p-5 border border-soft hover:border-accent hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex gap-4">
                        {/* Timeline Icon */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${colors.bg} ${colors.border}`}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${colors.text}`}
                            />
                          </motion.div>

                          {index < filteredActivities.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-200 my-2"></div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-semibold text-gray-900">
                                  {activity.user}
                                </span>

                                <span className="text-gray-600">
                                  {activity.action}
                                </span>

                                <span className="font-semibold text-primary">
                                  {activity.target}
                                </span>
                              </div>

                              <p className="text-sm text-gray-600">
                                {activity.time}
                              </p>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                            >
                              <CheckCircle className="w-5 h-5 text-gray-400 hover:text-accent" />
                            </motion.button>
                          </div>

                          {/* Details */}
                          <div className="mt-3 p-3 bg-bg-light rounded-lg border border-soft">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Calendar className="w-3 h-3" />

                              <span>
                                {activity.timestamp.toLocaleDateString()} at{" "}
                                {activity.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>

            {/* Load More */}
            {filteredActivities.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-accent text-accent hover:bg-accent/10 rounded-lg font-medium transition-all"
                >
                  Load More Activities
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
