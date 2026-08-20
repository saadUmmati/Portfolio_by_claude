"use client";

import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { site } from "@/data/site";
import ChatPanel from "@/components/ChatPanel";

// matchMedia doesn't fire change events for this particular check in practice (a
// device's hover/pointer capability doesn't change mid-session), so subscribe is a
// no-op -- this just needs a correct, SSR-safe snapshot read.
function subscribe() {
  return () => {};
}
function getSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
function getServerSnapshot() {
  return false;
}

export default function ChatFab() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isTouchInfo, setIsTouchInfo] = useState(false);
  // Only real mouse-driven devices get hover-to-open -- touch devices rely on
  // tap-to-toggle only. Mixing both on a touchscreen is what caused the
  // "hover doesn't work properly" issue: mobile browsers synthesize a hover-like
  // event on first tap, which fought with the click toggle.
  const canHover = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (pathname === "/chat") return null;

  return (
    <>
      {/* Sized to hug only the visible 56px button -- the popout below is
          absolutely positioned so it never expands this hoverable area. */}
      <div
        className="fixed bottom-6 right-6 z-40 h-14 w-14"
        onTouchStart={() => setIsTouchInfo(true)}
        onMouseEnter={canHover && !isTouchInfo ? () => setOpen(true) : undefined}
        onMouseLeave={canHover && !isTouchInfo ? () => setOpen(false) : undefined}
      >
        {/* Sub-options -- only mounted while open, so there's no DOM element for
            the browser to hit-test against when closed. */}
        {open && (
          <div className="animate-fade-up absolute right-0 bottom-full mb-3 flex flex-col items-end gap-3">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="cursor-hover group flex items-center gap-2"
            >
              <span className="liquid-glass-light rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap text-foreground/90 opacity-0 transition-opacity group-hover:opacity-100">
                WhatsApp me directly
              </span>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105">
                <FaWhatsapp size={20} />
              </span>
            </a>
            <button
              onClick={() => {
                setChatOpen(true);
                setOpen(false);
              }}
              aria-label="Chat with AI assistant"
              className="cursor-hover group flex items-center gap-2"
            >
              <span className="liquid-glass-light rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap text-foreground/90 opacity-0 transition-opacity group-hover:opacity-100">
                Ask my AI assistant
              </span>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-black/20 transition-transform hover:scale-105">
                <Sparkles size={18} />
              </span>
            </button>
          </div>
        )}

        {/* Main toggle -- the only interaction on touch devices, and a fallback
            click-to-toggle on desktop too (in case hover was missed). */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setOpen((o) => !o);
          }}
          aria-label="Contact options"
          aria-expanded={open}
          className="cursor-hover flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
      </div>

      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
