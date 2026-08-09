"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function ChatFab() {
  const pathname = usePathname();
  if (pathname === "/chat") return null;

  return (
    <Link
      href="/chat"
      aria-label="Chat with AI assistant"
      className="cursor-hover fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <MessageCircle size={22} />
    </Link>
  );
}
