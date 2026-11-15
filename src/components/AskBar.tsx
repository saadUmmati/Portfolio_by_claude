"use client";

import { useState } from "react";
import { site } from "@/data/site";

export const OPEN_CHAT_EVENT = "saad:open-chat";
export const openChat = (prompt?: string) =>
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { prompt } }));

const CHIPS = ["On-device AI projects", "What can you build for me?", "Show your stack", "Your experience"];

// "Ask anything" bar: opens the existing AI chat assistant, with the question already sent.
export default function AskBar() {
  const [q, setQ] = useState("");
  return (
    <div className="glass w-full max-w-3xl border border-paper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          openChat(q.trim() || undefined);
          setQ("");
        }}
        className="flex items-center gap-3 py-2.5 pr-2.5 pl-5 md:pl-6"
      >
        <label htmlFor="ask" className="sr-only">Ask {site.name}&rsquo;s AI assistant</label>
        <input
          id="ask"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask anything about my work…"
          className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-paper md:text-lg"
        />
        <button type="submit" className="cursor-hover bg-accent px-5 py-3 font-mono text-xs tracking-[0.08em] text-on-accent uppercase">
          Ask &#8629;
        </button>
      </form>
      <div className="flex flex-wrap gap-2 px-5 pb-4 md:px-6">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => openChat(c)}
            className="cursor-hover border border-paper px-3 py-1.5 font-mono text-[11px] tracking-[0.06em] uppercase transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
