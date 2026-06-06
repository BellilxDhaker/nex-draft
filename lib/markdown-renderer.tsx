import React from "react";

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;

  const patterns: [RegExp, (match: string[]) => React.ReactNode][] = [
    [/`([^`]+)`/, ([, code]) => (
      <code key={parts.length} className="text-accent bg-accent/5 px-1 py-0.5 rounded text-sm font-mono">
        {code}
      </code>
    )],
    [/\*\*([^*]+)\*\*/, ([, bold]) => (
      <strong key={parts.length} className="font-bold text-gray-900">{bold}</strong>
    )],
    [/\*([^*]+)\*/, ([, italic]) => (
      <em key={parts.length} className="italic">{italic}</em>
    )],
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

interface ListState {
  type: "ul" | "ol";
  items: React.ReactNode[];
}

function processLines(lines: string[]): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const listStack: ListState[] = [];

  function flushList() {
    if (listStack.length === 0) return null;
    const result = listStack.map((list, li) => {
      if (list.type === "ul") {
        return <ul key={`list-${li}`} className="list-disc pl-6 my-2 space-y-1">{list.items}</ul>;
      }
      return <ol key={`list-${li}`} className="list-decimal pl-6 my-2 space-y-1">{list.items}</ol>;
    });
    listStack.length = 0;
    return result;
  }

  function addElement(el: React.ReactNode) {
    elements.push(el);
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (listStack.length > 0) {
        const flushed = flushList();
        if (flushed) flushed.forEach((el) => addElement(el));
      }
      // Find closing fence
      let codeLines: string[] = [];
      let j = i + 1;
      let found = false;
      while (j < lines.length) {
        if (lines[j].trim().startsWith("```")) {
          found = true;
          break;
        }
        codeLines.push(lines[j]);
        j++;
      }
      if (found) {
        addElement(
          <pre key={`code-${i}`} className="bg-gray-900 text-gray-100 rounded-lg p-4 my-3 overflow-x-auto text-sm">
            <code>{codeLines.join("\n")}</code>
          </pre>,
        );
        i = j;
      } else {
        // No closing fence, treat rest as code
        codeLines = lines.slice(i + 1);
        addElement(
          <pre key={`code-${i}`} className="bg-gray-900 text-gray-100 rounded-lg p-4 my-3 overflow-x-auto text-sm">
            <code>{codeLines.join("\n")}</code>
          </pre>,
        );
        i = lines.length - 1;
      }
      continue;
    }

    if (!trimmed) {
      const flushed = flushList();
      if (flushed) {
        flushed.forEach((el) => addElement(el));
      } else {
        addElement(<div key={`spacer-${i}`} className="h-2" />);
      }
      continue;
    }

    if (trimmed.startsWith("### ")) {
      const flushed = flushList();
      if (flushed) flushed.forEach((el) => addElement(el));
      addElement(
        <h3 key={`h3-${i}`} className="text-lg font-bold text-gray-900 mt-5 mb-2">
          {trimmed.slice(4)}
        </h3>,
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      const flushed = flushList();
      if (flushed) flushed.forEach((el) => addElement(el));
      addElement(
        <h2 key={`h2-${i}`} className="text-xl font-bold text-gray-900 mt-6 mb-3">
          {trimmed.slice(3)}
        </h2>,
      );
      continue;
    }

    if (trimmed.startsWith("# ")) {
      const flushed = flushList();
      if (flushed) flushed.forEach((el) => addElement(el));
      addElement(
        <h1 key={`h1-${i}`} className="text-2xl font-bold text-gray-900 mt-6 mb-3">
          {trimmed.slice(2)}
        </h1>,
      );
      continue;
    }

    if (trimmed === "---" || trimmed === "***") {
      const flushed = flushList();
      if (flushed) flushed.forEach((el) => addElement(el));
      addElement(<hr key={`hr-${i}`} className="my-4 border-soft" />);
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const content = renderInline(trimmed.slice(2));
      if (listStack.length > 0 && listStack[listStack.length - 1].type === "ul") {
        listStack[listStack.length - 1].items.push(<li key={`li-${i}`}>{content}</li>);
      } else {
        listStack.push({ type: "ul", items: [<li key={`li-${i}`}>{content}</li>] });
      }
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const content = renderInline(trimmed.replace(/^\d+\.\s/, ""));
      if (listStack.length > 0 && listStack[listStack.length - 1].type === "ol") {
        listStack[listStack.length - 1].items.push(<li key={`li-${i}`}>{content}</li>);
      } else {
        listStack.push({ type: "ol", items: [<li key={`li-${i}`}>{content}</li>] });
      }
      continue;
    }

    const flushed = flushList();
    if (flushed) flushed.forEach((el) => addElement(el));
    addElement(
      <p key={`p-${i}`} className="text-gray-700 my-1.5 leading-relaxed">
        {renderInline(trimmed)}
      </p>,
    );
  }

  const listElements = flushList();
  if (listElements) listElements.forEach((el) => addElement(el));

  return elements;
}

export function MarkdownRenderer({ content }: { content: string }) {
  const elements = React.useMemo(() => processLines(content.split("\n")), [content]);
  return <>{elements}</>;
}
