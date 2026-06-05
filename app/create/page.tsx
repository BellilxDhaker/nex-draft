"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  Layout,
  Code,
  Database,
  Network,
  CheckSquare,
  MessageSquare,
  Shield,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

type AgentId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface Agent {
  id: AgentId;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const agents: Agent[] = [
  {
    id: 1,
    name: "Product Requirements Agent",
    description: "Generate PRDs with user stories, acceptance criteria, and success metrics",
    icon: FileText,
    color: "accent",
  },
  {
    id: 2,
    name: "System Architecture Agent",
    description: "Design scalable architecture with components, interactions, and deployment",
    icon: Layout,
    color: "cyan",
  },
  {
    id: 3,
    name: "Technical Specifications Agent",
    description: "Create implementation guides, tech stack, dependencies, and integration details",
    icon: Code,
    color: "accent-light",
  },
  {
    id: 4,
    name: "Database Design Agent",
    description: "Design normalized PostgreSQL schemas with relationships and indexing",
    icon: Database,
    color: "accent",
  },
  {
    id: 5,
    name: "API Contracts Agent",
    description: "Document full API specs with endpoints, schemas, auth, and error handling",
    icon: Network,
    color: "cyan",
  },
  {
    id: 6,
    name: "Development Tasks Agent",
    description: "Break down sprint-ready tasks with estimations and testing requirements",
    icon: CheckSquare,
    color: "accent-light",
  },
  {
    id: 7,
    name: "AI Prompts Agent",
    description: "Optimize prompts for coding, testing, documentation, and decision-making",
    icon: MessageSquare,
    color: "accent",
  },
  {
    id: 8,
    name: "AI Agent Rules Agent",
    description: "Define governance rules, workflow constraints, and quality assurance policies",
    icon: Shield,
    color: "cyan",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    border: "border-accent/20",
  },
  "accent-light": {
    bg: "bg-accent-light/10",
    text: "text-accent-light",
    border: "border-accent-light/20",
  },
  cyan: {
    bg: "bg-cyan/10",
    text: "text-cyan",
    border: "border-cyan/20",
  },
};

interface ProductSpec {
  target_users: string;
  goals: string;
  constraints: string;
}

interface ApiResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export default function CreatePage() {
  const [step, setStep] = useState<"form" | "result">("form");
  const [idea, setIdea] = useState("");
  const [context, setContext] = useState("");
  const [domain, setDomain] = useState("");
  const [productSpec, setProductSpec] = useState<ProductSpec>({
    target_users: "",
    goals: "",
    constraints: "",
  });
  const [selectedAgent, setSelectedAgent] = useState<AgentId | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const isFormValid = idea.trim() && selectedAgent !== null;

  const handleGenerate = async () => {
    if (!isFormValid) return;

    setIsGenerating(true);
    setError(null);
    setResult(null);

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
        },
        selected_agent: selectedAgent,
      };

      const res = await fetch(
        "https://nexdraft-agent-engine-dzhe.vercel.app/api/v1/prd",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data: ApiResponse = await res.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || "Generation failed");
      }

      setResult(data.data);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    setStep("form");
    setResult(null);
    setError(null);
  };

  const selectedAgentData = agents.find((a) => a.id === selectedAgent);

  return (
    <div className="flex h-screen bg-bg-light">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <motion.div
          className="bg-white border-b border-soft sticky top-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              {step === "result" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  className="text-accent hover:text-accent-light text-sm font-medium flex items-center gap-1"
                >
                  ← Back
                </motion.button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-primary">
                  {step === "form" ? "Create New Project" : "Generated Output"}
                </h1>
                <p className="text-gray-600 mt-1">
                  {step === "form"
                    ? "Describe your idea and select an AI agent to generate engineering artifacts"
                    : selectedAgentData?.name}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {step === "form" ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Project Details */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Project Details
                  </h2>
                  <div className="bg-white rounded-lg p-6 border border-soft space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Idea <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="e.g., A mobile-first grocery delivery platform"
                        className="w-full px-4 py-2.5 rounded-lg border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Context
                      </label>
                      <textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="Describe the system, existing infrastructure, team size, tech stack preferences..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Domain
                      </label>
                      <input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="e.g., E-commerce, Healthcare, FinTech, EdTech"
                        className="w-full px-4 py-2.5 rounded-lg border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Product Spec */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Product Spec
                  </h2>
                  <div className="bg-white rounded-lg p-6 border border-soft space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Target Users
                      </label>
                      <textarea
                        value={productSpec.target_users}
                        onChange={(e) =>
                          setProductSpec((prev) => ({
                            ...prev,
                            target_users: e.target.value,
                          }))
                        }
                        placeholder="One per line:&#10;Busy professionals&#10;Small business owners&#10;Delivery drivers"
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Goals
                      </label>
                      <textarea
                        value={productSpec.goals}
                        onChange={(e) =>
                          setProductSpec((prev) => ({
                            ...prev,
                            goals: e.target.value,
                          }))
                        }
                        placeholder="One per line:&#10;Reduce delivery time by 30%&#10;Support 10k concurrent users"
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Constraints
                      </label>
                      <textarea
                        value={productSpec.constraints}
                        onChange={(e) =>
                          setProductSpec((prev) => ({
                            ...prev,
                            constraints: e.target.value,
                          }))
                        }
                        placeholder="One per line:&#10;Must comply with GDPR&#10;Must work offline-first&#10;Budget cap of $50k"
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-soft bg-bg-light text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Agent Selection */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Select AI Agent
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose a specialized agent to generate your engineering
                    artifact
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
                          onClick={() => setSelectedAgent(agent.id)}
                          className={`bg-white rounded-lg p-4 border cursor-pointer transition-all ${
                            isSelected
                              ? "border-accent ring-2 ring-accent/20 shadow-md"
                              : "border-soft hover:border-accent/50 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 rounded-lg ${colors.bg} flex-shrink-0`}
                            >
                              <IconComponent
                                className={`w-5 h-5 ${colors.text}`}
                              />
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
                </motion.div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}

                {/* Generate Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    whileHover={isFormValid ? { scale: 1.02 } : {}}
                    whileTap={isFormValid ? { scale: 0.98 } : {}}
                    onClick={handleGenerate}
                    disabled={!isFormValid || isGenerating}
                    className={`w-full flex items-center justify-center gap-3 font-semibold py-4 rounded-xl transition-all ${
                      isFormValid && !isGenerating
                        ? "bg-gradient-to-r from-accent to-accent-light text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate with{" "}
                        {selectedAgentData?.name || "Selected Agent"}
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              /* Result View */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Agent Info */}
                {selectedAgentData && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-white rounded-lg border border-soft flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-accent/10">
                      <selectedAgentData.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedAgentData.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedAgentData.description}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Markdown Result */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl border border-soft overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-soft bg-gray-50 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Generated Output</h3>
                    <button
                      onClick={() => {
                        if (result) {
                          navigator.clipboard.writeText(result);
                        }
                      }}
                      className="text-xs text-accent hover:text-accent-light font-medium transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="p-6 prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-code:text-accent prose-code:bg-accent/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
                    <MarkdownRenderer content={result || ""} />
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 flex items-center gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="px-6 py-3 bg-white border border-soft text-gray-700 font-medium rounded-lg hover:border-accent/50 hover:text-accent transition-all"
                  >
                    ← New Generation
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const blob = new Blob([result || ""], {
                        type: "text/markdown",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "nexdraft-output.md";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-accent to-accent-light text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    Download Markdown
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = "";
  let listStack: { type: "ul" | "ol"; items: React.ReactNode[]; index: number }[] = [];

  const flushList = () => {
    if (listStack.length === 0) return null;
    const result = listStack.map((list) => {
      if (list.type === "ul") {
        return <ul key={Math.random()} className="list-disc pl-6 my-2 space-y-1">{list.items}</ul>;
      }
      return <ol key={Math.random()} className="list-decimal pl-6 my-2 space-y-1">{list.items}</ol>;
    });
    listStack = [];
    return result;
  };

  const processLine = (line: string, idx: number) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const lang = codeLanguage;
        codeLanguage = "";
        const code = codeBuffer.join("\n");
        codeBuffer = [];
        return (
          <pre key={idx} className="bg-gray-900 text-gray-100 rounded-lg p-4 my-3 overflow-x-auto text-sm">
            <code>{code}</code>
          </pre>
        );
      }
      inCodeBlock = true;
      codeLanguage = trimmed.slice(3).trim();
      return null;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return null;
    }

    if (!trimmed) {
      const listElements = flushList();
      return listElements || <div key={idx} className="h-2" />;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      const listElements = flushList();
      return <>{listElements}<h3 key={idx} className="text-lg font-bold text-gray-900 mt-5 mb-2">{trimmed.slice(4)}</h3></>;
    }
    if (trimmed.startsWith("## ")) {
      const listElements = flushList();
      return <>{listElements}<h2 key={idx} className="text-xl font-bold text-gray-900 mt-6 mb-3">{trimmed.slice(3)}</h2></>;
    }
    if (trimmed.startsWith("# ")) {
      const listElements = flushList();
      return <>{listElements}<h1 key={idx} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{trimmed.slice(2)}</h1></>;
    }

    // Horizontal rule
    if (trimmed === "---" || trimmed === "***") {
      const listElements = flushList();
      return <>{listElements}<hr key={idx} className="my-4 border-soft" /></>;
    }

    // Unordered list
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const content = renderInline(trimmed.slice(2));
      listStack.push({ type: "ul", items: [<li key={idx}>{content}</li>], index: idx });
      return null;
    }

    // Ordered list
    if (/^\d+\.\s/.test(trimmed)) {
      const content = renderInline(trimmed.replace(/^\d+\.\s/, ""));
      listStack.push({ type: "ol", items: [<li key={idx}>{content}</li>], index: idx });
      return null;
    }

    // Paragraph (inline rendered)
    const listElements = flushList();
    return <>{listElements}<p key={idx} className="text-gray-700 my-1.5 leading-relaxed">{renderInline(trimmed)}</p></>;
  };

  for (let i = 0; i < lines.length; i++) {
    const el = processLine(lines[i], i);
    if (el !== null) {
      elements.push(el);
    }
  }

  if (inCodeBlock) {
    inCodeBlock = false;
    elements.push(
      <pre key="eof-code" className="bg-gray-900 text-gray-100 rounded-lg p-4 my-3 overflow-x-auto text-sm">
        <code>{codeBuffer.join("\n")}</code>
      </pre>,
    );
    codeBuffer = [];
  }

  const listElements = flushList();
  if (listElements) elements.push(listElements);

  return <>{elements}</>;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;

  const patterns: [RegExp, (match: string[]) => React.ReactNode][] = [
    // Inline code
    [/`([^`]+)`/, ([, code]) => (
      <code key={parts.length} className="text-accent bg-accent/5 px-1 py-0.5 rounded text-sm font-mono">
        {code}
      </code>
    )],
    // Bold
    [/\*\*([^*]+)\*\*/, ([, bold]) => (
      <strong key={parts.length} className="font-bold text-gray-900">{bold}</strong>
    )],
    // Italic
    [/\*([^*]+)\*/, ([, italic]) => (
      <em key={parts.length} className="italic">{italic}</em>
    )],
    // Links
    [/\[([^\]]+)\]\(([^)]+)\)/, ([, linkText, linkUrl]) => (
      <a key={parts.length} href={linkUrl} className="text-accent hover:text-accent-light underline" target="_blank" rel="noopener noreferrer">
        {linkText}
      </a>
    )],
  ];

  while (remaining.length > 0) {
    let matched = false;

    for (const [pattern, renderFn] of patterns) {
      const match = remaining.match(pattern);
      if (match && match.index !== undefined && match.index === 0) {
        parts.push(renderFn(match));
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      const nextSpecial = remaining.search(/(`|\*\*|\*|\[)/);
      if (nextSpecial === -1) {
        parts.push(remaining);
        remaining = "";
      } else {
        parts.push(remaining.slice(0, nextSpecial));
        remaining = remaining.slice(nextSpecial);
      }
    }
  }

  return parts;
}
