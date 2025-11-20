// frontend/src/components/etc/MarkdownViewer.tsx

'use client';

import React, { ReactNode } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function MarkdownViewer({ content }: { content?: string }) {
  if (!content) return null;
  const normalized = content.replace(/\\n/g, "\n");

  const components: Components = {
    p: ({ children }) => <div className="mb-4">{children}</div>,
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-4 mt-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mb-3 mt-5">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mb-2 mt-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold mb-2 mt-3">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg font-semibold mb-1 mt-2">{children}</h5>,
    h6: ({ children }) => <h6 className="text-base font-semibold mb-1 mt-2">{children}</h6>,
    code({ inline, className, children, ...props }: CodeProps) {
      const text = String(children).replace(/\n$/, "");
      if (inline) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      return (
        <div className="relative group">
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(text)}
            className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2 btn btn-xs"
          >
            복사
          </button>
          <pre className="overflow-auto">
            <code className={className} {...props}>
              {text}
            </code>
          </pre>
        </div>
      );
    },
  };

  return (
    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [
            rehypeSanitize,
            {
              ...defaultSchema,
              tagNames: [
                ...(defaultSchema.tagNames || []),
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
              ],
            },
          ],
        ]}
        components={components}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}