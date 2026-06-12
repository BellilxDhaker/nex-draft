"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Compass,
  Bot,
  Code2,
  Puzzle,
  PlayCircle,
  HelpCircle,
  ChevronRight,
  Search,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Terminal,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import MarketingLayout from "@/components/layout/MarketingLayout";

interface DocSection {
  id: string;
  label: string;
  icon: typeof BookOpen;
  subsections: { id: string; label: string }[];
}

const docSections: DocSection[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Compass,
    subsections: [
      { id: "quickstart", label: "Quick Start" },
      { id: "installation", label: "Installation" },
      { id: "first-project", label: "Your First Project" },
    ],
  },
  {
    id: "overview",
    label: "Platform Overview",
    icon: BookOpen,
    subsections: [
      { id: "architecture", label: "Architecture" },
      { id: "key-concepts", label: "Key Concepts" },
      { id: "workflows", label: "Workflows" },
    ],
  },
  {
    id: "agents",
    label: "Agent Catalog",
    icon: Bot,
    subsections: [
      { id: "available-agents", label: "Available Agents" },
      { id: "custom-agents", label: "Custom Agents" },
      { id: "agent-config", label: "Agent Configuration" },
    ],
  },
  {
    id: "api",
    label: "API Reference",
    icon: Code2,
    subsections: [
      { id: "authentication", label: "Authentication" },
      { id: "endpoints", label: "Endpoints" },
      { id: "sdks", label: "SDKs & Libraries" },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Puzzle,
    subsections: [
      { id: "github", label: "GitHub" },
      { id: "vscode", label: "VS Code" },
      { id: "slack", label: "Slack" },
    ],
  },
  {
    id: "examples",
    label: "Examples",
    icon: PlayCircle,
    subsections: [
      { id: "web-app", label: "Web Application" },
      { id: "mobile-app", label: "Mobile App" },
      { id: "microservices", label: "Microservices" },
    ],
  },
  {
    id: "faq",
    label: "FAQs",
    icon: HelpCircle,
    subsections: [
      { id: "common", label: "Common Questions" },
      { id: "troubleshooting", label: "Troubleshooting" },
      { id: "support", label: "Support" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="px-2 py-1 text-xs font-mono bg-white/10 text-white/70 rounded hover:bg-white/20 transition-colors"
        >
          Copy
        </button>
      </div>
      <pre className="bg-primary-dark text-white/90 rounded-xl p-5 overflow-x-auto text-sm leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ContentSection({ id }: { id: string }) {
  const content: Record<string, { title: string; body: React.ReactNode }> = {
    quickstart: {
      title: "Quick Start",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Get started with NexDraft in under 5 minutes. This guide will walk
            you through creating your first project and generating your initial
            documentation.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Step 1: Sign Up
            </h4>
            <p className="text-primary/70">
              Create your NexDraft account at{" "}
              <Link
                href="/auth/login"
                className="text-accent hover:text-accent-light underline"
              >
                nexdraft.ai
              </Link>
              . No credit card required for the 14-day free trial.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Step 2: Create a Project
            </h4>
            <p className="text-primary/70">
              Once logged in, navigate to the Projects page and click &ldquo;New
              Project.&rdquo; Give your project a name and select the type of
              documentation you need.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Step 3: Generate Documentation
            </h4>
            <p className="text-primary/70">
              Describe your project in natural language. NexDraft&rsquo;s AI
              agents will analyze your input and generate comprehensive
              technical documentation.
            </p>
            <CodeBlock
              code={`# Example: Describe your project
"I'm building a task management app with React, Node.js, and PostgreSQL.
Users can create tasks, assign them to team members, and track progress
through customizable workflows."`}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Step 4: Review and Export
            </h4>
            <p className="text-primary/70">
              Review the generated documentation, make any adjustments, and
              export in your preferred format (Markdown, PDF, or HTML).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-br from-accent/5 to-cyan/5 border border-accent/10">
            <p className="text-sm font-semibold text-accent mb-1">
              🎉 Congratulations!
            </p>
            <p className="text-primary/70">
              You have completed your first NexDraft project. Explore the
              remaining guides to learn about advanced features like multi-agent
              workflows and custom integrations.
            </p>
          </div>
        </div>
      ),
    },
    installation: {
      title: "Installation",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            NexDraft is available as a web application and through our CLI tool.
            Choose the option that best fits your workflow.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">Web Application</h4>
            <p className="text-primary/70">
              No installation required. Simply visit{" "}
              <Link
                href="/auth/login"
                className="text-accent hover:text-accent-light underline"
              >
                app.nexdraft.ai
              </Link>{" "}
              and sign in to get started. All features are available through
              your browser.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">CLI Tool</h4>
            <p className="text-primary/70">
              For developers who prefer working from the terminal, install the
              NexDraft CLI:
            </p>
            <CodeBlock
              code={`# Install via npm
npm install -g @nexdraft/cli

# Or via yarn
yarn global add @nexdraft/cli

# Verify installation
nexdraft --version`}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              VS Code Extension
            </h4>
            <p className="text-primary/70">
              Install the NexDraft extension from the VS Code marketplace to
              generate documentation directly from your editor:
            </p>
            <CodeBlock
              code={`# Install via VS Code CLI
code --install-extension nexdraft.vscode-extension`}
            />
          </div>
        </div>
      ),
    },
    "first-project": {
      title: "Your First Project",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            This tutorial walks through creating a complete documentation suite
            for a sample project: a real-time chat application.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Project Setup
            </h4>
            <p className="text-primary/70">
              Navigate to the dashboard and click &ldquo;New Project.&rdquo;
              Enter the following details:
            </p>
            <div className="bg-bg-light rounded-xl p-5 border border-soft">
              <dl className="space-y-3">
                <div className="flex gap-4">
                  <dt className="font-semibold text-primary w-32 text-sm">
                    Project Name
                  </dt>
                  <dd className="text-primary/70 text-sm">
                    Real-Time Chat App
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="font-semibold text-primary w-32 text-sm">
                    Description
                  </dt>
                  <dd className="text-primary/70 text-sm">
                    A scalable real-time messaging platform
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="font-semibold text-primary w-32 text-sm">
                    Tech Stack
                  </dt>
                  <dd className="text-primary/70 text-sm">
                    Next.js, WebSocket, Redis, PostgreSQL
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Generated Documents
            </h4>
            <p className="text-primary/70">
              NexDraft will generate the following documents for your project:
            </p>
            <ul className="space-y-2">
              {[
                "Product Requirements Document (PRD)",
                "System Architecture Overview",
                "Technical Specifications",
                "Database Schema Design",
                "API Contracts",
                "Development Tasks",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-primary/70"
                >
                  <CheckCircle2 className="h-5 w-5 text-cyan flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    architecture: {
      title: "Architecture",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            NexDraft is built on a modern, scalable architecture designed for
            reliability and performance.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              High-Level Architecture
            </h4>
            <p className="text-primary/70">
              The platform consists of several key components working together
              to deliver a seamless documentation experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Frontend",
                desc: "Next.js application with React Server Components for optimal performance.",
              },
              {
                title: "API Gateway",
                desc: "Centralized entry point for all client requests with rate limiting and auth.",
              },
              {
                title: "Agent Orchestrator",
                desc: "Manages AI agent lifecycle, task distribution, and result aggregation.",
              },
              {
                title: "Storage Layer",
                desc: "Multi-tier storage with PostgreSQL, Redis caching, and S3-compatible object storage.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-xl bg-bg-light border border-soft"
              >
                <h5 className="font-bold text-primary text-sm mb-1">
                  {item.title}
                </h5>
                <p className="text-primary/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    "key-concepts": {
      title: "Key Concepts",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Understand the core concepts that make NexDraft powerful.
          </p>

          <div className="space-y-8">
            {[
              {
                title: "Projects",
                desc: "A project represents a software product or system you are documenting. Each project contains all generated documents, configurations, and history.",
              },
              {
                title: "AI Agents",
                desc: "Specialized AI agents that handle different aspects of documentation generation — from PRD writing to architecture design.",
              },
              {
                title: "Workflows",
                desc: "Multi-step processes that orchestrate multiple AI agents to produce comprehensive documentation suites.",
              },
              {
                title: "Templates",
                desc: "Pre-defined document structures that ensure consistency across your organization's documentation.",
              },
            ].map((concept) => (
              <div key={concept.title} className="space-y-2">
                <h4 className="text-lg font-bold text-primary">
                  {concept.title}
                </h4>
                <p className="text-primary/70">{concept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    workflows: {
      title: "Workflows",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            NexDraft workflows automate the end-to-end documentation process,
            from initial idea to final deliverable.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Standard Workflow
            </h4>
            <div className="space-y-3">
              {[
                {
                  step: "1. Input",
                  desc: "Describe your project in natural language or upload existing documents",
                },
                {
                  step: "2. Analysis",
                  desc: "AI agents analyze the input and identify documentation requirements",
                },
                {
                  step: "3. Generation",
                  desc: "Multiple agents collaborate to generate comprehensive documentation",
                },
                {
                  step: "4. Review",
                  desc: "Review and refine the generated content with team feedback",
                },
                {
                  step: "5. Export",
                  desc: "Export in your preferred format or sync with your toolchain",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 p-4 rounded-xl bg-bg-light border border-soft"
                >
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">
                      {item.step}
                    </p>
                    <p className="text-primary/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    "available-agents": {
      title: "Available Agents",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            NexDraft comes with a suite of specialized AI agents, each designed
            for a specific aspect of documentation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "PRD Writer",
                desc: "Generates comprehensive product requirement documents with user stories and acceptance criteria.",
              },
              {
                name: "Architect",
                desc: "Designs system architecture with component diagrams and deployment strategies.",
              },
              {
                name: "Technical Writer",
                desc: "Produces detailed technical specifications and implementation guides.",
              },
              {
                name: "API Specialist",
                desc: "Creates complete API documentation with endpoints, schemas, and examples.",
              },
              {
                name: "Database Designer",
                desc: "Generates normalized schemas with relationships and optimization strategies.",
              },
              {
                name: "Task Planner",
                desc: "Breaks down work into sprint-ready tasks with estimations and dependencies.",
              },
            ].map((agent) => (
              <div
                key={agent.name}
                className="p-5 rounded-xl bg-bg-light border border-soft hover:border-accent/30 transition-colors"
              >
                <h4 className="font-bold text-primary mb-1">{agent.name}</h4>
                <p className="text-primary/60 text-sm">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    "custom-agents": {
      title: "Custom Agents",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Extend NexDraft with custom agents tailored to your organization's
            specific documentation needs.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Creating a Custom Agent
            </h4>
            <p className="text-primary/70">
              Define custom agents using our agent configuration framework:
            </p>
            <CodeBlock
              code={`{
  "name": "Security Reviewer",
  "description": "Reviews documentation for security vulnerabilities",
  "model": "gpt-4",
  "instructions": [
    "Identify potential security issues in architecture",
    "Suggest remediation strategies",
    "Generate security compliance checklist"
  ],
  "outputFormat": "markdown"
}`}
            />
          </div>
        </div>
      ),
    },
    "agent-config": {
      title: "Agent Configuration",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Fine-tune agent behavior through configuration options.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Configuration Options
            </h4>
            <CodeBlock
              code={`{
  "temperature": 0.7,
  "maxTokens": 4000,
  "model": "gpt-4",
  "systemPrompt": "You are a senior software architect...",
  "constraints": [
    "Follow company documentation standards",
    "Use approved technology stack only"
  ],
  "tools": ["search", "code-analysis", "diagram-generation"]
}`}
            />
            <p className="text-primary/70">
              Configure agents through the dashboard or programmatically via the
              API.
            </p>
          </div>
        </div>
      ),
    },
    authentication: {
      title: "Authentication",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            The NexDraft API uses API keys for authentication. Include your API
            key in all requests.
          </p>

          <CodeBlock
            code={`curl -X GET https://api.nexdraft.ai/v1/projects \\
  -H "Authorization: Bearer nd_sk_your_api_key_here" \\
  -H "Content-Type: application/json"`}
          />

          <div className="p-5 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-sm font-semibold text-amber-800 mb-1">
              ⚠️ API Key Security
            </p>
            <p className="text-amber-700 text-sm">
              Never share your API keys or commit them to version control. Use
              environment variables to store keys securely.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Generating API Keys
            </h4>
            <p className="text-primary/70">
              API keys can be generated from the Settings page in your NexDraft
              dashboard. Each key can be scoped to specific permissions and
              projects.
            </p>
          </div>
        </div>
      ),
    },
    endpoints: {
      title: "Endpoints",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            The NexDraft REST API provides programmatic access to all platform
            features.
          </p>

          <div className="space-y-6">
            {[
              {
                method: "GET",
                path: "/v1/projects",
                desc: "List all projects",
              },
              {
                method: "POST",
                path: "/v1/projects",
                desc: "Create a new project",
              },
              {
                method: "GET",
                path: "/v1/projects/:id",
                desc: "Get project details",
              },
              {
                method: "POST",
                path: "/v1/projects/:id/generate",
                desc: "Generate documentation",
              },
              {
                method: "GET",
                path: "/v1/documents",
                desc: "List documents in a project",
              },
            ].map((endpoint) => (
              <div
                key={endpoint.path}
                className="flex items-center gap-4 p-4 rounded-xl bg-bg-light border border-soft"
              >
                <span
                  className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
                    endpoint.method === "GET"
                      ? "bg-green-100 text-green-700"
                      : endpoint.method === "POST"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {endpoint.method}
                </span>
                <code className="text-sm font-mono text-primary flex-1">
                  {endpoint.path}
                </code>
                <span className="text-sm text-primary/50">{endpoint.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    sdks: {
      title: "SDKs & Libraries",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Official SDKs for popular programming languages make integrating
            NexDraft into your workflow seamless.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "JavaScript/TypeScript", cmd: "npm install @nexdraft/sdk" },
              { name: "Python", cmd: "pip install nexdraft-sdk" },
              { name: "Go", cmd: "go get github.com/nexdraft/sdk" },
              { name: "Ruby", cmd: "gem install nexdraft" },
            ].map((sdk) => (
              <div
                key={sdk.name}
                className="p-4 rounded-xl bg-bg-light border border-soft"
              >
                <h4 className="font-bold text-primary text-sm mb-2">
                  {sdk.name}
                </h4>
                <code className="text-sm font-mono text-primary/70">
                  {sdk.cmd}
                </code>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">Usage Example</h4>
            <CodeBlock
              code={`import NexDraft from '@nexdraft/sdk';

const client = new NexDraft({
  apiKey: process.env.NEXDRAFT_API_KEY,
});

const project = await client.projects.create({
  name: 'My Project',
  description: 'A new software project',
  techStack: ['Next.js', 'TypeScript', 'PostgreSQL'],
});

const documents = await client.projects.generate(project.id, {
  type: 'full-suite',
});`}
            />
          </div>
        </div>
      ),
    },
    github: {
      title: "GitHub Integration",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Connect NexDraft with your GitHub repositories for seamless
            documentation workflows.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">Setup</h4>
            <p className="text-primary/70">
              Install the NexDraft GitHub App from the GitHub Marketplace and
              grant access to your repositories.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">Features</h4>
            <ul className="space-y-2">
              {[
                "Auto-generate PRDs from repository descriptions",
                "Sync documentation with pull requests",
                "Update docs automatically on merge",
                "Create issues from generated development tasks",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-primary/70"
                >
                  <CheckCircle2 className="h-5 w-5 text-cyan flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    vscode: {
      title: "VS Code Extension",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Generate and manage documentation directly from Visual Studio Code.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">Installation</h4>
            <p className="text-primary/70">
              Search for &ldquo;NexDraft&rdquo; in the VS Code extensions panel
              or install via CLI:
            </p>
            <CodeBlock
              code={`code --install-extension nexdraft.vscode-extension`}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">Commands</h4>
            <div className="space-y-3">
              {[
                { cmd: "NexDraft: Generate PRD", desc: "Generate a PRD from the current project context" },
                { cmd: "NexDraft: Generate Architecture", desc: "Create system architecture documentation" },
                { cmd: "NexDraft: Open Dashboard", desc: "Open the NexDraft web dashboard" },
              ].map((command) => (
                <div
                  key={command.cmd}
                  className="flex items-start gap-4 p-3 rounded-lg bg-bg-light border border-soft"
                >
                  <Terminal className="h-4 w-4 text-primary/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <code className="text-sm font-mono text-primary font-semibold">
                      {command.cmd}
                    </code>
                    <p className="text-xs text-primary/50">{command.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    slack: {
      title: "Slack Integration",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Stay informed and control NexDraft directly from Slack.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">Slash Commands</h4>
            <div className="space-y-3">
              {[
                { cmd: "/nexdraft generate", desc: "Trigger documentation generation" },
                { cmd: "/nexdraft status", desc: "Check generation status" },
                { cmd: "/nexdraft list", desc: "List recent projects" },
              ].map((cmd) => (
                <div
                  key={cmd.cmd}
                  className="flex items-start gap-4 p-3 rounded-lg bg-bg-light border border-soft"
                >
                  <code className="text-sm font-mono text-accent font-semibold">
                    {cmd.cmd}
                  </code>
                  <span className="text-sm text-primary/60">{cmd.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">Notifications</h4>
            <p className="text-primary/70">
              Receive notifications in Slack when documentation generation is
              complete, when team members request reviews, and when documents
              are updated.
            </p>
          </div>
        </div>
      ),
    },
    "web-app": {
      title: "Web Application",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Complete example of documenting a full-stack web application.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">Project Brief</h4>
            <p className="text-primary/70">
              An e-commerce platform built with Next.js, Stripe for payments,
              Prisma ORM, and PostgreSQL.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Generated Documents
            </h4>
            <ul className="space-y-2">
              {[
                "E-Commerce Platform PRD",
                "System Architecture: Microservices vs Monolith analysis",
                "Database Schema: Products, Orders, Users, Inventory",
                "API Documentation: REST endpoints for frontend integration",
                "Stripe Integration Guide with webhook handling",
                "Development sprint plan with 2-week iterations",
              ].map((doc) => (
                <li
                  key={doc}
                  className="flex items-start gap-3 text-primary/70"
                >
                  <CheckCircle2 className="h-5 w-5 text-cyan flex-shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    "mobile-app": {
      title: "Mobile App",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Example of documenting a React Native mobile application with a
            Node.js backend.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Key Documentation
            </h4>
            <ul className="space-y-2">
              {[
                "Mobile App PRD with user personas and journeys",
                "API contract between mobile client and backend",
                "Offline-first architecture with sync strategy",
                "Push notification system design",
                "App store deployment checklist",
                "Performance optimization guide",
              ].map((doc) => (
                <li
                  key={doc}
                  className="flex items-start gap-3 text-primary/70"
                >
                  <CheckCircle2 className="h-5 w-5 text-cyan flex-shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    microservices: {
      title: "Microservices",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Comprehensive documentation for a microservices-based architecture.
          </p>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Architecture Overview
            </h4>
            <p className="text-primary/70">
              A 12-microservice architecture with event-driven communication
              via Kafka, service mesh using Istio, and observability with
              OpenTelemetry.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-primary">
              Documentation Suite
            </h4>
            <ul className="space-y-2">
              {[
                "Service boundary definitions and responsibilities",
                "Event catalog with schema definitions",
                "Inter-service communication patterns",
                "Deployment and scaling strategies",
                "Monitoring and alerting runbooks",
                "Disaster recovery procedures",
              ].map((doc) => (
                <li
                  key={doc}
                  className="flex items-start gap-3 text-primary/70"
                >
                  <CheckCircle2 className="h-5 w-5 text-cyan flex-shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    common: {
      title: "Common Questions",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Answers to the most frequently asked questions about NexDraft.
          </p>

          <div className="space-y-4">
            {[
              {
                q: "What types of documents can NexDraft generate?",
                a: "NexDraft generates PRDs, system architecture docs, technical specifications, database schemas, API documentation, development tasks, AI prompts, and agent rules.",
              },
              {
                q: "How accurate is the AI-generated content?",
                a: "NexDraft uses state-of-the-art language models and specialized agents to produce high-quality, contextually accurate documentation. We recommend reviewing all generated content before use.",
              },
              {
                q: "Can I customize the output format?",
                a: "Yes. NexDraft supports Markdown, PDF, HTML, and plain text. You can also customize templates to match your organization's documentation standards.",
              },
              {
                q: "Is my data secure?",
                a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). NexDraft is SOC 2 compliant and supports SSO/SAML for enterprise customers.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="p-5 rounded-xl bg-bg-light border border-soft"
              >
                <h4 className="font-bold text-primary mb-2">{faq.q}</h4>
                <p className="text-primary/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    troubleshooting: {
      title: "Troubleshooting",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            Common issues and their solutions.
          </p>

          <div className="space-y-4">
            {[
              {
                issue: "Generation takes too long",
                solution:
                  "Complex projects may take longer. Try breaking your project into smaller sections or upgrading to a plan with priority processing.",
              },
              {
                issue: "API key not working",
                solution:
                  "Ensure your API key is active and has the correct permissions. Generate a new key from the Settings page if needed.",
              },
              {
                issue: "Integration not connecting",
                solution:
                  "Verify your integration credentials and permissions. Check that the integration is enabled for your workspace.",
              },
            ].map((item) => (
              <div
                key={item.issue}
                className="p-5 rounded-xl bg-bg-light border border-soft"
              >
                <h4 className="font-bold text-primary mb-1">{item.issue}</h4>
                <p className="text-primary/70 text-sm">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    support: {
      title: "Support",
      body: (
        <div className="space-y-6">
          <p className="text-primary/70 leading-relaxed text-lg">
            We're here to help you succeed with NexDraft.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Email Support",
                desc: "Get help via email with 24-hour response time.",
                action: "support@nexdraft.ai",
              },
              {
                title: "Documentation",
                desc: "Browse our comprehensive documentation hub.",
                action: "View Docs",
                link: "/docs",
              },
              {
                title: "Community",
                desc: "Join our community of developers and documentation experts.",
                action: "Join Community",
              },
              {
                title: "Enterprise Support",
                desc: "Dedicated support with SLA guarantees for enterprise plans.",
                action: "Contact Sales",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-bg-light border border-soft"
              >
                <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                <p className="text-primary/60 text-sm mb-3">{item.desc}</p>
                <span className="text-accent text-sm font-semibold hover:text-accent-light transition-colors cursor-pointer">
                  {item.action} →
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  };

  const section = content[id];
  if (!section) {
    return (
      <div className="text-center py-12">
        <p className="text-primary/40">Select a section from the sidebar.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-3xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
        {section.title}
      </h2>
      {section.body}
    </motion.div>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("quickstart");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarRef = useRef<HTMLDivElement>(null);

  const allSubsections = docSections.flatMap((s) => s.subsections);

  const filteredSections = docSections
    .map((section) => ({
      ...section,
      subsections: section.subsections.filter(
        (sub) =>
          !searchQuery ||
          sub.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(
      (section) =>
        !searchQuery ||
        section.subsections.length > 0 ||
        section.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const activeSectionData = allSubsections.find(
    (s) => s.id === activeSection
  );

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-white">
        {/* Docs Header */}
        <div className="border-b border-soft bg-bg-light/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">
                  Documentation
                </h1>
                {activeSectionData && (
                  <div className="hidden sm:flex items-center gap-2 text-sm text-primary/40">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="text-primary/60">
                      {activeSectionData.label}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-primary/30" />
                  <input
                    type="text"
                    placeholder="Search docs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-56 pl-9 pr-3 py-2 rounded-lg border border-soft bg-white text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                </div>
                <button
                  className="md:hidden p-2 text-primary/70 hover:text-primary"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  aria-label="Toggle sidebar"
                >
                  {sidebarOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 relative">
            {/* Sidebar */}
            <motion.aside
              ref={sidebarRef}
              className={`${
                sidebarOpen
                  ? "fixed inset-0 z-30 bg-black/20"
                  : "hidden md:block"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className={`${
                  sidebarOpen
                    ? "absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto p-4"
                    : "w-64 flex-shrink-0 py-8 overflow-y-auto sticky top-28 max-h-[calc(100vh-7rem)]"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <nav className="space-y-6">
                  {filteredSections.map((section) => {
                    const SectionIcon = section.icon;
                    return (
                      <div key={section.id}>
                        <div className="flex items-center gap-2 px-3 mb-2">
                          <SectionIcon className="h-4 w-4 text-primary/50" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-primary/50">
                            {section.label}
                          </span>
                        </div>
                        <div className="space-y-0.5 ml-1">
                          {section.subsections.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setActiveSection(sub.id);
                                setSidebarOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                                activeSection === sub.id
                                  ? "bg-accent/10 text-accent font-semibold"
                                  : "text-primary/60 hover:text-primary hover:bg-bg-light"
                              }`}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </nav>

                {/* Bottom Links */}
                <div className="mt-8 pt-6 border-t border-soft space-y-2">
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-primary/60 hover:text-primary hover:bg-bg-light rounded-lg transition-colors"
                  >
                    <Sparkles className="h-4 w-4 text-accent" />
                    Start Free Trial
                    <ArrowRight className="h-3 w-3 ml-auto" />
                  </Link>
                  <Link
                    href="/resources"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-primary/60 hover:text-primary hover:bg-bg-light rounded-lg transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    Resource Center
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </Link>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 py-8 md:py-12 min-w-0">
              {searchQuery ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-primary">
                    Search Results
                  </h2>
                  {filteredSections.some((s) => s.subsections.length > 0) ? (
                    <div className="space-y-3">
                      {filteredSections.map(
                        (section) =>
                          section.subsections.length > 0 && (
                            <div key={section.id} className="space-y-1">
                              <p className="text-sm font-semibold text-primary/50 uppercase tracking-wider">
                                {section.label}
                              </p>
                              {section.subsections.map((sub) => (
                                <button
                                  key={sub.id}
                                  onClick={() => {
                                    setActiveSection(sub.id);
                                    setSearchQuery("");
                                  }}
                                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-bg-light text-primary/70 hover:text-primary transition-colors"
                                >
                                  {sub.label}
                                </button>
                              ))}
                            </div>
                          )
                      )}
                    </div>
                  ) : (
                    <p className="text-primary/40">
                      No results found for &ldquo;{searchQuery}&rdquo;
                    </p>
                  )}
                </div>
              ) : (
                <ContentSection id={activeSection} />
              )}
            </main>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
