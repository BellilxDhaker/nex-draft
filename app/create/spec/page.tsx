"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Lightbulb, FileText, Globe, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateContext } from "@/lib/create-context";
import { createProject, getProject, updateProject } from "@/lib/projects";
import { StepIndicator } from "@/app/create/step-indicator";

function Step2ProjectDetailsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { projectId, idea, context, domain, productSpec, setProjectId, setIdea, setContext, setDomain } = useCreateContext();
  const [saving, setSaving] = useState(false);
  const [loadingProject, setLoadingProject] = useState(false);

  const isValid = idea.trim().length > 0;

  useEffect(() => {
    const pid = searchParams.get("projectId");
    if (!pid) return;

    const load = async () => {
      setLoadingProject(true);
      try {
        const project = await getProject(pid);
        if (project) {
          setProjectId(project.id);
          setIdea(project.title);
          setContext(project.context);
          setDomain(project.domain);
        }
      } catch {
        // silently fail
      } finally {
        setLoadingProject(false);
      }
    };
    load();
  }, [searchParams, setProjectId, setIdea, setContext, setDomain]);

  const handleNext = async () => {
    if (!isValid || saving) return;

    setSaving(true);
    try {
      if (projectId) {
        await updateProject(projectId, {
          title: idea.trim(),
          context: context.trim(),
          domain: domain.trim(),
          target_users: productSpec.target_users,
          goals: productSpec.goals,
          constraints: productSpec.constraints,
        });
      } else {
        const project = await createProject({
          title: idea.trim(),
          context: context.trim(),
          domain: domain.trim(),
          target_users: productSpec.target_users,
          goals: productSpec.goals,
          constraints: productSpec.constraints,
        });
        setProjectId(project.id);
      }
      router.push("/create/agent");
    } catch {
      // silently fail - user can retry
    } finally {
      setSaving(false);
    }
  };

  if (loadingProject) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl border border-soft shadow-premium overflow-hidden">
        <div className="p-5 sm:p-6 pb-0">
          <div className="flex justify-center">
            <StepIndicator currentStep={1} />
          </div>
          <div className="h-px bg-soft -mx-5 sm:-mx-6 mt-4" />
        </div>
        <div className="p-6 sm:p-8 space-y-5">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <Lightbulb className="w-4 h-4 text-accent" />
            Idea <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g., A mobile-first grocery delivery platform"
            className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm"
          />
          <p className="text-xs text-gray-400">
            A short, clear description of your product or project idea
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <FileText className="w-4 h-4 text-accent" />
            Context
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Describe the system, existing infrastructure, team size, tech stack preferences..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm resize-none"
          />
          <p className="text-xs text-gray-400">
            Any relevant background information that helps the AI understand your project better
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <Globe className="w-4 h-4 text-accent" />
            Domain
          </label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="e.g., E-commerce, Healthcare, FinTech, EdTech"
            className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm"
          />
          <p className="text-xs text-gray-400">
            The industry or domain your project belongs to
          </p>
        </div>
      </div>
    </div>

      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/create")}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-accent px-4 py-3 rounded-xl hover:bg-white/50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        <motion.button
          whileHover={isValid && !saving ? { scale: 1.02 } : {}}
          whileTap={isValid && !saving ? { scale: 0.98 } : {}}
          onClick={handleNext}
          disabled={!isValid || saving}
          className={`flex items-center gap-2 font-semibold py-3 px-6 rounded-xl transition-all text-sm ${
            isValid && !saving
              ? "bg-gradient-to-r from-accent to-accent-light text-white shadow-md hover:shadow-lg"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
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

export default function Step2ProjectDetails() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    }>
      <Step2ProjectDetailsInner />
    </Suspense>
  );
}
