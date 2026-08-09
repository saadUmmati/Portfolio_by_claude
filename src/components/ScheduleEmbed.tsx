"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Your real Calendly link, used as the default. Override by setting
// NEXT_PUBLIC_CALENDLY_URL in .env.local if you ever want to swap it.
const DEFAULT_CALENDLY_URL = "https://calendly.com/saadiahmed";
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || DEFAULT_CALENDLY_URL;

export default function ScheduleEmbed() {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    if (!CALENDLY_URL) return;

    // If the widget script hasn't loaded (or errored) within a few seconds -- most
    // commonly because an ad-blocker or privacy extension blocks Calendly's script,
    // which is common enough to plan for -- fall back to a direct link instead of
    // spinning forever.
    const timeout = setTimeout(() => setStatus((s) => (s === "loading" ? "error" : s)), 8000);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      clearTimeout(timeout);
      setStatus("loaded");
    };
    script.onerror = () => {
      clearTimeout(timeout);
      setStatus("error");
    };
    document.body.appendChild(script);
    return () => {
      clearTimeout(timeout);
      document.body.removeChild(script);
    };
  }, []);

  if (!CALENDLY_URL) {
    return (
      <div className="flex h-[600px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="font-medium">Calendly not connected yet</p>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Add your Calendly link as <code className="text-accent">NEXT_PUBLIC_CALENDLY_URL</code> in{" "}
          <code className="text-accent">.env.local</code> and this space will show your live
          booking calendar automatically.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface p-10 text-center">
        <p className="font-medium">Couldn&apos;t load the booking calendar here</p>
        <p className="max-w-sm text-sm text-muted">
          This can happen if an ad-blocker or privacy extension blocks Calendly&apos;s widget. You can
          still book directly:
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noreferrer"
          className="cursor-hover mt-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Open booking calendar
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Loading state -- Calendly's script takes a moment to inject the real iframe,
          so this avoids a blank/broken-looking box while it initializes. */}
      {status === "loading" && (
        <div className="flex h-[650px] flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface sm:h-[700px]">
          <Loader2 className="animate-spin text-accent" size={22} />
          <p className="text-sm text-muted">Loading available times...</p>
        </div>
      )}
      <div
        className={`calendly-inline-widget w-full min-w-[280px] rounded-2xl border border-border ${
          status === "loaded" ? "h-[650px] sm:h-[700px]" : "hidden"
        }`}
        data-url={CALENDLY_URL}
      />
    </div>
  );
}
