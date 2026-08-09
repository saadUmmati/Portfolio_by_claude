"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { site } from "@/data/site";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "What services do you offer?",
  "Tell me about your on-device AI experience",
  "Are you available for full-time roles?",
];

export default function ChatWidget({ autoFocus = true }: { autoFocus?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hi! I'm ${site.name}. Ask me anything about my work, services, or expertise.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll the chat pane itself, not the whole page -- keeps the input/header
    // pinned in place instead of the browser jumping the entire viewport.
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-5">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                m.role === "user" ? "bg-surface-2" : "bg-accent/15 text-accent"
              }`}
            >
              {m.role === "user" ? <User size={15} /> : <Bot size={15} />}
            </div>
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[80%] ${
                m.role === "user" ? "bg-accent text-white" : "bg-surface-2 text-foreground"
              }`}
            >
              {m.role === "assistant" ? (
                <div className="chat-markdown">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{m.content}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Bot size={15} />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl bg-surface-2 px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 border-t border-border p-3 sm:p-4">
          {STARTER_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              className="cursor-hover rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-foreground"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2 border-t border-border p-3 sm:p-4"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          autoFocus={autoFocus}
          className="cursor-hover flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="cursor-hover flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
