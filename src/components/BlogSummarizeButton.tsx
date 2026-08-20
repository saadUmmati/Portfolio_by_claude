"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function BlogSummarizeButton({
  title,
  plainText,
}: {
  title: string;
  plainText: string;
}) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  async function handleSummarize() {
    if (loading) return;
    setLoading(true);
    setSummary(null);
    try {
      const res = await fetch("/api/summarize-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text: plainText }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch {
      setSummary("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
      {!summary && !loading && (
        <button
          onClick={handleSummarize}
          className="cursor-hover flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Sparkles size={15} />
          Summarize with AI
        </button>
      )}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted">
          <Loader2 size={16} className="animate-spin text-accent" />
          Reading the post...
        </div>
      )}
      {summary && !loading && (
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase">
            <Sparkles size={13} /> AI Summary
          </p>
          <div className="chat-markdown mt-3 text-sm leading-relaxed text-foreground/90">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
          <button
            onClick={handleSummarize}
            className="cursor-hover mt-4 flex min-h-[44px] items-center text-xs text-accent hover:underline py-1"
          >
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
