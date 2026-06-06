"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Shield, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateContext } from "@/lib/create-context";
import { StepIndicator } from "./step-indicator";

export default function Step1ProductSpec() {
  const router = useRouter();
  const { productSpec, setProductSpec } = useCreateContext();
  const [saving, setSaving] = useState(false);

  const updateField = (field: "target_users" | "goals" | "constraints", value: string) => {
    setProductSpec({ ...productSpec, [field]: value });
  };

  const handleNext = async () => {
    if (saving) return;
    setSaving(true);
    router.push("/create/spec");
    setSaving(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl border border-soft shadow-premium overflow-hidden">
        <div className="p-5 sm:p-6 pb-0">
          <div className="flex justify-center">
            <StepIndicator currentStep={0} />
          </div>
          <div className="h-px bg-soft -mx-5 sm:-mx-6 mt-4" />
        </div>
        <div className="p-6 sm:p-8 space-y-5">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <Users className="w-4 h-4 text-accent" />
            Target Users
          </label>
          <textarea
            value={productSpec.target_users}
            onChange={(e) => updateField("target_users", e.target.value)}
            placeholder="One per line:&#10;Busy professionals&#10;Small business owners&#10;Delivery drivers"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm resize-none"
          />
          <p className="text-xs text-gray-400">
            Who will use your product? List each user group on a new line
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <Target className="w-4 h-4 text-accent" />
            Goals
          </label>
          <textarea
            value={productSpec.goals}
            onChange={(e) => updateField("goals", e.target.value)}
            placeholder="One per line:&#10;Reduce delivery time by 30%&#10;Support 10k concurrent users"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm resize-none"
          />
          <p className="text-xs text-gray-400">
            What should your project achieve? List each goal on a new line
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <Shield className="w-4 h-4 text-accent" />
            Constraints
          </label>
          <textarea
            value={productSpec.constraints}
            onChange={(e) => updateField("constraints", e.target.value)}
            placeholder="One per line:&#10;Must comply with GDPR&#10;Must work offline-first&#10;Budget cap of $50k"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm resize-none"
          />
          <p className="text-xs text-gray-400">
            Technical, regulatory, or budgetary limitations for your project
          </p>
        </div>
      </div>
    </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={!saving ? { scale: 1.02 } : {}}
          whileTap={!saving ? { scale: 0.98 } : {}}
          onClick={handleNext}
          disabled={saving}
          className="flex items-center gap-2 font-semibold py-3 px-6 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white shadow-md hover:shadow-lg transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Next Step
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
