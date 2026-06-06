"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Lightbulb,
  FileText,
  Globe,
  Users,
  Target,
  Shield,
  Sparkles,
  Loader2,
  Save,
  Check,
  AlertCircle,
  Layout,
  Code,
  Database,
  Network,
  CheckSquare,
  MessageSquare,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { useCreateContext, type Agent, type AgentId } from "@/lib/create-context";
import { getProject, updateProject, type Project } from "@/lib/projects";

const API_URL = "/api/v1/prd";

const agents: (Agent & { id: AgentId })[] = [
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

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const {
    setIdea,
    setContext,
    setDomain,
    setProductSpec,
    setSelectedAgent,
    setResult,
    setError: setCreateError,
    setIsGenerating,
    isGenerating,
  } = useCreateContext();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [localContext, setLocalContext] = useState("");
  const [localDomain, setLocalDomain] = useState("");
  const [targetUsers, setTargetUsers] = useState("");
  const [goals, setGoals] = useState("");
  const [constraints, setConstraints] = useState("");
  const [selectedAgent, setSelectedAgentLocal] = useState<AgentId | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProject(projectId);
        if (!data) {
          router.replace("/projects");
          return;
        }
        setProject(data);
        setTitle(data.title);
        setLocalContext(data.context);
        setLocalDomain(data.domain);
        setTargetUsers(data.target_users);
        setGoals(data.goals);
        setConstraints(data.constraints);
      } catch {
        router.replace("/projects");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [projectId, router]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError("");
    try {
      const updated = await updateProject(projectId, {
        title: title.trim(),
        context: localContext.trim(),
        domain: localDomain.trim(),
        target_users: targetUsers,
        goals: goals,
        constraints: constraints,
      });
      setProject(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }, [projectId, title, localContext, localDomain, targetUsers, goals, constraints]);

  const handleGenerate = async () => {
    if (!title.trim() || selectedAgent === null || isGenerating) return;

    setIsGenerating(true);
    setCreateError(null);
    setResult(null);

    setIdea(title.trim());
    setContext(localContext.trim());
    setDomain(localDomain.trim());
    setProductSpec({
      target_users: targetUsers,
      goals: goals,
      constraints: constraints,
    });
    setSelectedAgent(selectedAgent);

    await handleSave();

    router.push("/create/result");

    try {
      const payload = {
        input: {
          idea: title.trim(),
          context: localContext.trim(),
          domain: localDomain.trim(),
        },
        product_spec: {
          target_users: targetUsers.split("\n").filter(Boolean),
          goals: goals.split("\n").filter(Boolean),
          constraints: constraints.split("\n").filter(Boolean),
        },
        generation_config: {
          format: "markdown",
          detail_level: "comprehensive",
          model: "gpt-4",
          tone: "professional",
        },
        selected_agent: selectedAgent,
      };

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
      setCreateError(
        err instanceof Error ? err.message : "Something went wrong",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-bg-light">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      </div>
    );
  }

  const isValid = title.trim().length > 0 && selectedAgent !== null;

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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
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
                  <h1 className="text-xl font-bold text-primary truncate max-w-md">
                    {project?.title || "Project"}
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Edit your project details and generate artifacts
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={saving}
                  className={`flex items-center gap-2 font-medium py-2 px-4 rounded-xl transition-all text-sm ${
                    saveSuccess
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-white text-gray-700 border border-soft hover:border-accent/50 hover:text-accent"
                  }`}
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : saveSuccess ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saveSuccess ? "Saved" : saving ? "Saving..." : "Save"}
                </motion.button>

                <motion.button
                  whileHover={isValid ? { scale: 1.02 } : {}}
                  whileTap={isValid ? { scale: 0.98 } : {}}
                  onClick={handleGenerate}
                  disabled={!isValid || isGenerating}
                  className={`flex items-center gap-2 font-semibold py-2.5 px-5 rounded-xl transition-all text-sm ${
                    isValid && !isGenerating
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
                      <Sparkles className="w-4 h-4" />
                      Generate
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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

            {/* Project Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Lightbulb className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-primary">
                    Project Details
                  </h2>
                  <p className="text-xs text-gray-500">
                    Define your project idea, context, and domain
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-soft shadow-premium space-y-5">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., A mobile-first grocery delivery platform"
                    className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <FileText className="w-4 h-4 text-accent" />
                    Context
                  </label>
                  <textarea
                    value={localContext}
                    onChange={(e) => setLocalContext(e.target.value)}
                    placeholder="Describe the system, existing infrastructure, team size, tech stack preferences..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Globe className="w-4 h-4 text-accent" />
                    Domain
                  </label>
                  <input
                    type="text"
                    value={localDomain}
                    onChange={(e) => setLocalDomain(e.target.value)}
                    placeholder="e.g., E-commerce, Healthcare, FinTech, EdTech"
                    className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm"
                  />
                </div>
              </div>
            </motion.div>

            {/* Product Spec Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-primary">
                    Product Spec
                  </h2>
                  <p className="text-xs text-gray-500">
                    Define scope, users, and constraints
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-soft shadow-premium space-y-5">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Users className="w-4 h-4 text-accent" />
                    Target Users
                  </label>
                  <textarea
                    value={targetUsers}
                    onChange={(e) => setTargetUsers(e.target.value)}
                    placeholder="One per line:&#10;Busy professionals&#10;Small business owners&#10;Delivery drivers"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Target className="w-4 h-4 text-accent" />
                    Goals
                  </label>
                  <textarea
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="One per line:&#10;Reduce delivery time by 30%&#10;Support 10k concurrent users"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <Shield className="w-4 h-4 text-accent" />
                    Constraints
                  </label>
                  <textarea
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    placeholder="One per line:&#10;Must comply with GDPR&#10;Must work offline-first&#10;Budget cap of $50k"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Agent Selection Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-primary">
                    AI Agent
                  </h2>
                  <p className="text-xs text-gray-500">
                    Choose a specialized agent to generate your artifact
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-soft shadow-premium">
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
                        onClick={() => setSelectedAgentLocal(agent.id)}
                        className={`bg-white rounded-xl p-4 border cursor-pointer transition-all ${
                          isSelected
                            ? "border-accent ring-2 ring-accent/20 shadow-md"
                            : "border-soft hover:border-accent/50 hover:shadow-sm"
                        }`}
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
              </div>
            </motion.div>

            {/* Bottom Generate Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="sticky bottom-6"
            >
              <div className="bg-white rounded-2xl p-4 border border-soft shadow-premium-lg flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {!title.trim() ? (
                    <span className="text-red-500 font-medium">
                      Enter a project title to continue
                    </span>
                  ) : !selectedAgent ? (
                    "Select an AI agent above"
                  ) : (
                    <span className="text-gray-700">
                      Ready to generate with{" "}
                      <span className="font-semibold text-accent">
                        {agents.find((a) => a.id === selectedAgent)?.name}
                      </span>
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={isValid ? { scale: 1.02 } : {}}
                  whileTap={isValid ? { scale: 0.98 } : {}}
                  onClick={handleGenerate}
                  disabled={!isValid || isGenerating}
                  className={`flex items-center gap-2 font-semibold py-2.5 px-6 rounded-xl transition-all text-sm ${
                    isValid && !isGenerating
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
                      <Sparkles className="w-4 h-4" />
                      Generate Now
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
