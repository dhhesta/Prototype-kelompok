import React from 'react';

/**
 * Lightweight, safe parser for AI-generated markdown text.
 * Handles paragraphs, lists, bold text, italics, headers, code, and callouts.
 */
export function renderFormattedContent(text: string): React.ReactNode {
  if (!text) return null;

  // Split by double newline into blocks
  const blocks = text.split(/\n\n+/);

  return (
    <div className="space-y-3 leading-relaxed text-slate-800">
      {blocks.map((block, blockIdx) => {
        const trimmed = block.trim();

        // Check if block is a blockquote
        if (trimmed.startsWith('>')) {
          const quoteText = trimmed.replace(/^>\s*/gm, '');
          return (
            <div
              key={blockIdx}
              className="border-l-4 border-purple-500 bg-purple-50/80 px-4 py-2.5 rounded-r-lg text-purple-900 text-sm my-2 font-medium"
            >
              {renderInline(quoteText)}
            </div>
          );
        }

        // Check if block is a heading (### or ## or #)
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={blockIdx} className="text-base font-bold text-purple-900 mt-2">
              {renderInline(trimmed.replace(/^###\s+/, ''))}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={blockIdx} className="text-lg font-bold text-purple-900 mt-3">
              {renderInline(trimmed.replace(/^##\s+/, ''))}
            </h3>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={blockIdx} className="text-xl font-extrabold text-purple-950 mt-4">
              {renderInline(trimmed.replace(/^#\s+/, ''))}
            </h2>
          );
        }

        // Check if block is a numbered list (1. item)
        const lines = trimmed.split('\n');
        const isNumbered = lines.every((line) => /^\d+\.\s+/.test(line.trim()));
        if (isNumbered && lines.length > 0) {
          return (
            <ol key={blockIdx} className="list-decimal list-outside pl-5 space-y-1.5 my-2">
              {lines.map((line, lIdx) => {
                const itemContent = line.trim().replace(/^\d+\.\s+/, '');
                return (
                  <li key={lIdx} className="text-slate-800 pl-1">
                    {renderInline(itemContent)}
                  </li>
                );
              })}
            </ol>
          );
        }

        // Check if block is a bulleted list (- or * item)
        const isBullet = lines.every((line) => /^[-*•]\s+/.test(line.trim()));
        if (isBullet && lines.length > 0) {
          return (
            <ul key={blockIdx} className="list-disc list-outside pl-5 space-y-1.5 my-2">
              {lines.map((line, lIdx) => {
                const itemContent = line.trim().replace(/^[-*•]\s+/, '');
                return (
                  <li key={lIdx} className="text-slate-800 pl-1">
                    {renderInline(itemContent)}
                  </li>
                );
              })}
            </ul>
          );
        }

        // Mixed lines or standard paragraph
        return (
          <p key={blockIdx} className="whitespace-pre-wrap">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {renderInline(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Parse inline bold (**bold**), italic (*italic*), and backtick code (`code`)
 */
function renderInline(text: string): React.ReactNode[] {
  // Regex pattern for bold, code, italic
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold
      parts.push(
        <strong key={match.index} className="font-semibold text-purple-950">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Italic
      parts.push(
        <em key={match.index} className="italic text-slate-700">
          {match[3]}
        </em>
      );
    } else if (match[4]) {
      // Code
      parts.push(
        <code
          key={match.index}
          className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded text-xs font-mono font-medium"
        >
          {match[4]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}
