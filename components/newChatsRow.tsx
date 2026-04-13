import Image from "next/image";
import React, { memo, useState } from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ClipboardIcon from "./gptIcons/clipboardIcon";

type NewChatsRowProp = {
  m: {
    id: string;
    userId: string;
    newChatId: string;
    role: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  };
  user: {
    id: string;
    externalUserId: string;
    username: string;
    profile: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

const NewChatsRow = memo(function NewChatsRow({ m, user }: NewChatsRowProp) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full overflow-hidden">
      {m.role === "user" ? (
        <div className="flex justify-end">
          <div className="flex gap-3 max-w-[85%]">
            <div className="flex flex-col items-end gap-1">
              <div className="bg-[#2f2f2f] text-white px-4 py-3 rounded-3xl rounded-br-md text-sm leading-relaxed">
                {m.content}
              </div>
            </div>
            <div className="shrink-0 mt-1">
              <Image
                src={user?.profile || ""}
                alt="profile"
                width={32}
                height={32}
                priority
                className="w-7 h-7 rounded-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 w-full overflow-hidden">
          <div className="shrink-0 mt-1">
            <Image
              src="/logo.png"
              alt="assistant"
              width={32}
              height={32}
              priority
              className="w-7 h-7 rounded-full"
            />
          </div>
          <div className="flex flex-col flex-1 min-w-0 gap-1 overflow-hidden">
            <p className="font-semibold text-sm text-white">ChatTPG</p>
            <div className="text-[#ececec] leading-7 text-sm overflow-hidden">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-3 last:mb-0 leading-7">{children}</p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mt-4 mb-2 text-white">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold mt-4 mb-2 text-white">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold mt-3 mb-1 text-white">{children}</h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-3 ml-5 space-y-1 list-disc marker:text-zinc-400">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-3 ml-5 space-y-1 list-decimal marker:text-zinc-400">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-7 pl-1">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-zinc-500 pl-4 my-3 text-zinc-400 italic">
                      {children}
                    </blockquote>
                  ),
                  hr: () => <hr className="my-4 border-zinc-700" />,
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-zinc-300">{children}</em>
                  ),
                  // ✅ table with overflow wrapper
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-3 rounded-lg border border-zinc-700 max-w-full">
                      <table className="w-full text-sm">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-zinc-800 text-zinc-300">{children}</thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className="divide-y divide-zinc-700">{children}</tbody>
                  ),
                  tr: ({ children }) => <tr>{children}</tr>,
                  th: ({ children }) => (
                    <th className="px-4 py-2 text-left font-semibold whitespace-nowrap">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2 text-zinc-300">{children}</td>
                  ),
                  code: ({ node, inline, className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeString = String(children).replace(/\n$/, "");
                    const blockId = `${m.id}-${codeString.slice(0, 20)}`;

                    if (!inline && match) {
                      return (
                        <div className="my-3 rounded-xl overflow-hidden border border-zinc-700 max-w-full">
                          <div className="flex items-center justify-between bg-zinc-800 px-4 py-2">
                            <span className="text-xs text-zinc-400 font-mono">{match[1]}</span>
                            <button
                              onClick={() => handleCopy(codeString, blockId)}
                              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                            >
                              {copiedId === blockId ? (
                                <>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <ClipboardIcon />
                                  Copy code
                                </>
                              )}
                            </button>
                          </div>
                          <SyntaxHighlighter
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              borderRadius: 0,
                              fontSize: "0.8rem",
                              lineHeight: "1.6",
                              background: "#1a1a1a",
                              overflowX: "auto",
                            }}
                            {...props}
                          >
                            {codeString}
                          </SyntaxHighlighter>
                        </div>
                      );
                    }

                    return (
                      <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-[0.82em] font-mono break-all" {...props}>
                        {children}
                      </code>
                    );
                  },
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors break-all">
                      {children}
                    </a>
                  ),
                }}
              >
                {m.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default NewChatsRow;