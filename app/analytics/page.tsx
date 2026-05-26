"use client";

import { motion } from "framer-motion";
import { TrendingUp, Download, Calendar, FileText, Cpu } from "lucide-react";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month");

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

  const analyticsData: {
    label: string;
    value: string;
    change: string;
    icon: React.ElementType;
    chartData: number[];
  }[] = [];

  const topDesigns: {
    name: string;
    views: number;
    clicks: number;
    avgTime: string;
    engagement: number;
  }[] = [];

  const templateCategories: {
    name: string;
    value: number;
    percentage: number;
  }[] = [];

  const dailyActivity: { day: string; value: number }[] = [];

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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-primary">Analytics</h1>
                <p className="text-gray-600 mt-1">
                  Performance and usage insights
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-light transition-colors font-medium"
              >
                <Download className="w-4 h-4" /> Export Report
              </motion.button>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2">
              {["week", "month", "quarter", "year"].map((range) => (
                <motion.button
                  key={range}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    timeRange === range
                      ? "bg-accent text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {range}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Key Metrics */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {analyticsData.length === 0 ? (
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg p-6 border border-soft shadow-sm"
                  >
                    <p className="text-gray-600 text-sm font-medium">
                      No analytics data available yet.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Connect tracking to populate key metrics.
                    </p>
                  </motion.div>
                ) : (
                  analyticsData.map((metric, index) => {
                    const IconComponent = metric.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-lg p-6 border border-soft shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-gray-600 text-sm font-medium">
                              {metric.label}
                            </p>
                            <p className="text-2xl font-bold text-primary mt-2">
                              {metric.value}
                            </p>
                          </div>
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <IconComponent className="w-5 h-5 text-accent" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-semibold text-green-600">
                            {metric.change}
                          </span>
                          <span className="text-xs text-gray-600">
                            vs last period
                          </span>
                        </div>

                        {/* Mini Chart */}
                        {metric.chartData.length > 0 && (
                          <div className="mt-4 h-8 flex items-end gap-0.5">
                            {metric.chartData.map((value, i) => (
                              <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{
                                  height: `${(value / Math.max(...metric.chartData)) * 24}px`,
                                }}
                                transition={{
                                  delay: i * 0.05,
                                  duration: 0.5,
                                }}
                                className="flex-1 bg-gradient-to-t from-accent to-accent-light rounded-t-sm opacity-70 hover:opacity-100 transition-opacity"
                              ></motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </motion.div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Daily Activity Chart */}
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-2 bg-white rounded-lg p-6 border border-soft shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-primary">
                      Daily Activity
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="p-2 hover:bg-bg-light rounded-lg transition-colors"
                    >
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </motion.button>
                  </div>

                  {/* Simple Bar Chart */}
                  <div className="space-y-4">
                    {dailyActivity.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-soft bg-bg-light p-4 text-sm text-gray-600">
                        No activity data yet.
                      </div>
                    ) : (
                      dailyActivity.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-4"
                        >
                          <span className="w-12 text-sm font-medium text-gray-600">
                            {item.day}
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(item.value / 100) * 100}%`,
                              }}
                              transition={{
                                delay: index * 0.05,
                                duration: 0.6,
                              }}
                              className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                            ></motion.div>
                          </div>
                          <span className="w-8 text-right text-sm font-semibold text-primary">
                            {item.value}
                          </span>
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>

                {/* Template Distribution */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-lg p-6 border border-soft shadow-sm"
                >
                  <h2 className="text-lg font-bold text-primary mb-6">
                    Template Distribution
                  </h2>

                  <div className="space-y-4">
                    {templateCategories.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-soft bg-bg-light p-4 text-sm text-gray-600">
                        No template distribution data yet.
                      </div>
                    ) : (
                      templateCategories.map((category, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              {category.name}
                            </span>
                            <span className="text-sm font-bold text-primary">
                              {category.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${category.percentage}%` }}
                              transition={{ delay: index * 0.1, duration: 0.6 }}
                              className={`h-full rounded-full ${
                                index === 0
                                  ? "bg-accent"
                                  : index === 1
                                    ? "bg-accent-light"
                                    : index === 2
                                      ? "bg-cyan"
                                      : "bg-blue-400"
                              }`}
                            ></motion.div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {templateCategories.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-soft">
                      <p className="text-xs text-gray-600 mb-2">
                        Total Created
                      </p>
                      <p className="text-2xl font-bold text-primary">150</p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Top Performing Designs */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-lg border border-soft shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-soft">
                  <h2 className="text-lg font-bold text-primary">
                    Top Performing Designs
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-bg-light border-b border-soft">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Design
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Views
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Clicks
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Avg Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Engagement
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-soft">
                      {topDesigns.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-6 text-sm text-gray-600"
                          >
                            No top designs yet.
                          </td>
                        </tr>
                      ) : (
                        topDesigns.map((design, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ backgroundColor: "#f7f9fc" }}
                            className="hover:bg-bg-light transition-colors cursor-pointer"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {design.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-primary">
                                {design.views.toLocaleString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-accent">
                                {design.clicks}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">
                                {design.avgTime}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-green-600">
                                {design.engagement}%
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* AI Usage Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="bg-white rounded-lg p-6 border border-soft shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-primary">
                      AI Generations
                    </h3>
                    <Cpu className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Usage data is not available yet.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-soft shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-primary">
                      Storage Usage
                    </h3>
                    <FileText className="w-5 h-5 text-cyan" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Storage data is not available yet.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
