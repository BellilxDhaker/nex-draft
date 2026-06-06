"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

function CreateLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#f5f7fb]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <motion.div
          className="bg-white border-b border-soft sticky top-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary">
                  Create New Project
                </h1>
                <p className="text-gray-500 mt-1">
                  Start building with AI-powered documentation
                </p>
              </div>
              <div />
            </div>
          </div>
        </motion.div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <CreateLayoutContent>{children}</CreateLayoutContent>;
}
