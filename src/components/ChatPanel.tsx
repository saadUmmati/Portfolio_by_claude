"use client";

import { X, Sparkles } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";

export default function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button
        aria-label="Close chat"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="liquid-glass-strong animate-slide-in-right relative flex h-full w-full max-w-md flex-col border-l border-border sm:m-3 sm:h-[calc(100%-1.5rem)] sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold">Ask my AI Assistant</p>
              <p className="text-xs text-muted">Usually replies instantly</p>
            </div>
          </div>
          <button
            aria-label="Close chat"
            onClick={onClose}
            className="cursor-hover flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <div className="min-h-0 flex-1">
          <ChatWidget autoFocus />
        </div>
      </div>
    </div>
  );
}
