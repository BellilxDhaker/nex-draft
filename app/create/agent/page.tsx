"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  AlertCircle,
  FileText,
  Layout,
  Code,
  Database,
  Network,
  CheckSquare,
  MessageSquare,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateContext, type Agent } from "@/lib/create-context";

const API_URL = "/api/v1/prd";

const agents: Agent[] = [
  { id: 1, name: "Product Requirements Agent", description: "Generate PRDs with user stories, acceptance criteria, and success metrics", icon: FileText, color: "accent" },
  { id: 2, name: "System Architecture Agent", description: "Design scalable architecture with components, interactions, and deployment", icon: Layout, color: "cyan" },
  { id: 3, name: "Technical Specifications Agent", description: "Create implementation guides, tech stack, dependencies, and integration details", icon: Code, color: "accent-light" },
  { id: 4, name: "Database Design Agent", description: "Design normalized PostgreSQL schemas with relationships and indexing", icon: Database, color: "accent" },
  { id: 5, name: "API Contracts Agent", description: "Document full API specs with endpoints, schemas, auth, and error handling", icon: Network, color: "cyan" },
  { id: 6, name: "Development Tasks Agent", description: "Break down sprint-ready tasks with estimations and testing requirements", icon: CheckSquare, color: "accent-light" },
  { id: 7, name: "AI Prompts Agent", description: "Optimize prompts for coding, testing, documentation, and decision-making", icon: MessageSquare, color: "accent" },
  { id: 8, name: "AI Agent Rules Agent", description: "Define governance rules, workflow constraints, and quality assurance policies", icon: Shield, color: "cyan" },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  accent: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" },
  "accent-light": { bg: "bg-accent-light/10", text: "text-accent-light", border: "border-accent-light/20" },
  cyan: { bg: "bg-cyan/10", text: "text-cyan", border: "border-cyan/20" },
};

export default function Step3AgentSelection() {
  const router = useRouter();
  const {
    idea,
    context,
    domain,
    productSpec,
    selectedAgent,
    setSelectedAgent,
    setResult,
    setError,
    setIsGenerating,
    isGenerating,
    error,
  } = useCreateContext();

  const isFormValid = idea.trim() && selectedAgent !== null;

  const handleGenerate = async () => {
    if (!isFormValid || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setResult(null);

    router.push("/create/result");

    try {
      const payload = {
        input: {
          idea: idea.trim(),
          context: context.trim(),
          domain: domain.trim(),
        },
        product_spec: {
          target_users: productSpec.target_users.split("\n").filter(Boolean),
          goals: productSpec.goals.split("\n").filter(Boolean),
          constraints: productSpec.constraints.split("\n").filter(Boolean),
        },
        generation_config: {
          format: "markdown",
          detail_level: "comprehensive",
          model: "gpt-4",
          tone: "professional",
        },
        selected_agent: selectedAgent,
      };

      console.log("Sending payload:", JSON.stringify(payload, null, 2));

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error (${res.status}): ${text.slice(0, 200)}`);
      }

      const data = await res.json();

      if (!data.prd) {
        throw new Error(data.error || "Generation failed");
      }

      setResult(data.prd);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center mb-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-light/20 flex items-center justify-center mx-auto mb-4"
        >
          <Sparkles className="w-7 h-7 text-accent" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900">Select AI Agent</h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose a specialized agent to generate your engineering artifact
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {agents.map((agent, index) => {
          const IconComponent = agent.icon;
          const colors = colorMap[agent.color];
          const isSelected = selectedAgent === agent.id;

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -4 }}
              onClick={() => !isGenerating && setSelectedAgent(agent.id)}
              className={`bg-white rounded-xl p-4 border cursor-pointer transition-all ${
                isSelected
                  ? "border-accent ring-2 ring-accent/20 shadow-md"
                  : "border-soft hover:border-accent/50 hover:shadow-sm"
              } ${isGenerating ? "pointer-events-none opacity-60" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl ${colors.bg} flex-shrink-0`}>
                  <IconComponent className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/create/spec")}
          disabled={isGenerating}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-accent px-4 py-3 rounded-xl hover:bg-white/50 transition-all disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        <motion.button
          whileHover={isFormValid && !isGenerating ? { scale: 1.02 } : {}}
          whileTap={isFormValid && !isGenerating ? { scale: 0.98 } : {}}
          onClick={handleGenerate}
          disabled={!isFormValid || isGenerating}
          className={`flex items-center gap-2 font-semibold py-3 px-6 rounded-xl transition-all text-sm ${
            isFormValid && !isGenerating
              ? "bg-gradient-to-r from-accent to-accent-light text-white shadow-md hover:shadow-lg"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Generate
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
