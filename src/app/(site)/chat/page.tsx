"use client";

import { Sparkles } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";

export default function ChatPage() {
  return (
    <div className="container-page flex flex-col py-10 sm:py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Chat with my AI Assistant
            </h1>
            <p className="text-sm text-muted">
              Instant answers about my work, services, and expertise.
            </p>
          </div>
        </div>

        <div className="mt-6 h-[65vh] min-h-[420px] rounded-2xl border border-border bg-surface sm:h-[600px]">
          <ChatWidget />
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          Powered by Gemini. Set <code className="text-accent">GEMINI_API_KEY</code> in{" "}
          <code className="text-accent">.env.local</code> to enable live responses.
        </p>
      </div>
    </div>
  );
}
