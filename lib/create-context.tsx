"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type AgentId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Agent {
  id: AgentId;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

export interface ProductSpec {
  target_users: string;
  goals: string;
  constraints: string;
}

export interface CreateState {
  projectId: string | null;
  idea: string;
  context: string;
  domain: string;
  productSpec: ProductSpec;
  selectedAgent: AgentId | null;
  result: string | null;
  error: string | null;
  isGenerating: boolean;
}

interface CreateContextValue extends CreateState {
  setProjectId: (v: string | null) => void;
  setIdea: (v: string) => void;
  setContext: (v: string) => void;
  setDomain: (v: string) => void;
  setProductSpec: (v: ProductSpec) => void;
  setSelectedAgent: (v: AgentId | null) => void;
  setResult: (v: string | null) => void;
  setError: (v: string | null) => void;
  setIsGenerating: (v: boolean) => void;
  reset: () => void;
}

const initialState: CreateState = {
  projectId: null,
  idea: "",
  context: "",
  domain: "",
  productSpec: { target_users: "", goals: "", constraints: "" },
  selectedAgent: null,
  result: null,
  error: null,
  isGenerating: false,
};

const CreateContext = createContext<CreateContextValue | null>(null);

export function CreateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CreateState>(initialState);

  const setProjectId = useCallback((projectId: string | null) => setState((prev) => ({ ...prev, projectId })), []);
  const setIdea = useCallback((idea: string) => setState((prev) => ({ ...prev, idea, error: null })), []);
  const setContext = useCallback((context: string) => setState((prev) => ({ ...prev, context })), []);
  const setDomain = useCallback((domain: string) => setState((prev) => ({ ...prev, domain })), []);
  const setProductSpec = useCallback((productSpec: ProductSpec) => setState((prev) => ({ ...prev, productSpec })), []);
  const setSelectedAgent = useCallback((selectedAgent: AgentId | null) => setState((prev) => ({ ...prev, selectedAgent })), []);
  const setResult = useCallback((result: string | null) => setState((prev) => ({ ...prev, result })), []);
  const setError = useCallback((error: string | null) => setState((prev) => ({ ...prev, error })), []);
  const setIsGenerating = useCallback((isGenerating: boolean) => setState((prev) => ({ ...prev, isGenerating })), []);
  const reset = useCallback(() => setState(initialState), []);

  return (
    <CreateContext.Provider
      value={{ ...state, setProjectId, setIdea, setContext, setDomain, setProductSpec, setSelectedAgent, setResult, setError, setIsGenerating, reset }}
    >
      {children}
    </CreateContext.Provider>
  );
}

export function useCreateContext() {
  const ctx = useContext(CreateContext);
  if (!ctx) throw new Error("useCreateContext must be used within CreateProvider");
  return ctx;
}
