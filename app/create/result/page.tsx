"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sparkles,
  Download,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateContext } from "@/lib/create-context";
import { MarkdownRenderer } from "@/lib/markdown-renderer";
import { useState } from "react";

export default function Step4Result() {
  const router = useRouter();
  const {
    result,
    error,
    isGenerating,
    selectedAgent,
    reset,
    setResult,
    setError,
    idea,
  } = useCreateContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nexdraft-output.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleNewGeneration = () => {
    reset();
    router.push("/create");
  };

  const handleRetry = () => {
    setResult(null);
    setError(null);
    router.push("/create/agent");
  };

  if (!isGenerating && !result && !error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Generation Found</h3>
          <p className="text-sm text-gray-500 mb-6">Start a new generation from the beginning</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewGeneration}
            className="inline-flex items-center gap-2 font-semibold py-3 px-6 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white shadow-md hover:shadow-lg transition-all text-sm"
          >
            <Sparkles className="w-4 h-4" />
            New Generation
          </motion.button>
        </motion.div>
      </div>
    );
  }

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
          {isGenerating ? (
            <Loader2 className="w-7 h-7 text-accent animate-spin" />
          ) : error ? (
            <AlertCircle className="w-7 h-7 text-red-500" />
          ) : (
            <Sparkles className="w-7 h-7 text-accent" />
          )}
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900">
          {isGenerating ? "Generating..." : error ? "Generation Failed" : "Generated Output"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {isGenerating
            ? `AI is crafting your ${selectedAgent ? "engineering artifact" : "document"}...`
            : error
              ? "Something went wrong during generation"
              : `Result for "${idea.slice(0, 50)}${idea.length > 50 ? "..." : ""}"`}
        </p>
      </div>

      {isGenerating && (
        <div className="bg-white rounded-2xl p-10 border border-soft shadow-premium flex flex-col items-center justify-center text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-accent/20 border-t-accent mb-6"
          />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Crafting Your Document
          </h3>
          <p className="text-sm text-gray-500 max-w-md">
            Our AI agent is analyzing your inputs and generating comprehensive engineering artifacts.
            This usually takes a few seconds.
          </p>
          <div className="flex gap-1.5 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full bg-accent/60"
              />
            ))}
          </div>
        </div>
      )}

      {error && !isGenerating && (
        <div className="bg-white rounded-2xl p-8 border border-soft shadow-premium">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Generation Failed
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md">{error}</p>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRetry}
                className="flex items-center gap-2 font-semibold py-3 px-6 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white shadow-md hover:shadow-lg transition-all text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNewGeneration}
                className="flex items-center gap-2 font-medium py-3 px-6 rounded-xl border border-soft text-gray-700 hover:border-accent/50 transition-all text-sm"
              >
                New Generation
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {result && !isGenerating && (
        <>
          <div className="bg-white rounded-2xl border border-soft shadow-premium overflow-hidden">
            <div className="px-6 py-4 border-b border-soft bg-gray-50/80 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm">
                Generated Output
              </h3>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-accent px-3 py-1.5 rounded-lg hover:bg-white transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-light px-3 py-1.5 rounded-lg hover:bg-white transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </motion.button>
              </div>
            </div>
            <div className="p-6 sm:p-8 prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-code:text-accent prose-code:bg-accent/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
              <MarkdownRenderer content={result} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNewGeneration}
              className="flex items-center gap-2 font-medium py-3 px-5 rounded-xl border border-soft text-gray-600 hover:border-accent/50 hover:text-accent transition-all text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              New Generation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="flex items-center gap-2 font-semibold py-3 px-6 rounded-xl bg-gradient-to-r from-accent to-accent-light text-white shadow-md hover:shadow-lg transition-all text-sm"
            >
              <Download className="w-4 h-4" />
              Download Markdown
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
}
