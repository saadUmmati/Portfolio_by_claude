"use client";

import { useState } from "react";
import { Mail, Sparkles, Copy, Check, Loader2, Download } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { site } from "@/data/site";
import Reveal from "@/components/Reveal";

export default function Contact({ resumeUrl }: { resumeUrl: string }) {
  // Outreach helper state
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [generating, setGenerating] = useState(false);
  const [outreachMessage, setOutreachMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "sent" | "error">("idle");

  // "Write with AI" mini-flow for the message field
  const [aiWriterOpen, setAiWriterOpen] = useState(false);
  const [brief, setBrief] = useState("");
  const [drafting, setDrafting] = useState(false);

  async function handleWriteWithAI() {
    if (!brief.trim() || drafting) return;
    setDrafting(true);
    try {
      const res = await fetch("/api/write-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief }),
      });
      const data = await res.json();
      setMsg(data.message);
      setAiWriterOpen(false);
      setBrief("");
    } catch {
      // leave the field as-is; the visitor can just type it themselves
    } finally {
      setDrafting(false);
    }
  }

  async function handleGenerate() {
    if (!company || !role || generating) return;
    setGenerating(true);
    setOutreachMessage(null);
    try {
      const res = await fetch("/api/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role }),
      });
      const data = await res.json();
      setOutreachMessage(data.message);
    } catch {
      setOutreachMessage("Something went wrong. Please try again shortly.");
    } finally {
      setGenerating(false);
    }
  }

  function handleCopy() {
    if (!outreachMessage) return;
    navigator.clipboard.writeText(outreachMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSendStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg }),
      });
      const data = await res.json();
      if (data.message === "sent") {
        setSendStatus("sent");
        setName("");
        setEmail("");
        setMsg("");
      } else {
        setSendStatus("error");
      }
    } catch {
      setSendStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-28 py-12 sm:py-16 md:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Left column */}
        <Reveal>
          <p className="text-xs font-medium tracking-widest text-accent uppercase">Contact</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
              intelligent
            </span>{" "}
            together
          </h2>
          <p className="mt-3 max-w-md text-muted">
            Whether it&apos;s on-device AI, LLM-powered agents, or workflow automation,
            I&apos;m open to freelance projects, collaborations, and remote roles focused on
            impactful AI work.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="cursor-hover liquid-glass-light flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/90 transition-transform hover:scale-105"
            >
              <Mail size={14} /> Email
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="cursor-hover liquid-glass-light flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/90 transition-transform hover:scale-105"
            >
              <FaLinkedin size={14} /> LinkedIn
            </a>
            <a
              href={resumeUrl}
              download
              className="cursor-hover liquid-glass-light flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/90 transition-transform hover:scale-105"
            >
              <Download size={14} /> Download Resume
            </a>
          </div>

          {/* AI Outreach Helper */}
          <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase">
              <Sparkles size={13} /> AI Outreach Helper
            </p>
            <p className="mt-2 text-sm text-muted">
              Generate a short, recruiter-ready message tailored to a specific company and
              role using this portfolio&apos;s details.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name"
                className="cursor-hover min-h-[44px] rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Role title (e.g. ML Engineer)"
                className="cursor-hover min-h-[44px] rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!company || !role || generating}
              className="cursor-hover mt-3 flex min-h-[44px] w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
            >
              {generating ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Generating...
                </>
              ) : (
                "Generate outreach message"
              )}
            </button>

            {outreachMessage && (
              <div className="animate-fade-up mt-4 rounded-xl border border-accent/30 bg-accent/5 p-4">
                <p className="text-sm text-foreground/90">{outreachMessage}</p>
                <button
                  onClick={handleCopy}
                  className="cursor-hover mt-3 flex min-h-[44px] items-center gap-1.5 text-xs text-accent hover:underline py-1"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy message"}
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {/* Right column: contact form */}
        <Reveal delay={100}>
          <form
            onSubmit={handleSend}
            className="liquid-glass flex flex-col gap-4 rounded-3xl p-6"
          >
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="cursor-hover mt-1.5 min-h-[44px] w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="cursor-hover mt-1.5 min-h-[44px] w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Message</label>
                <button
                  type="button"
                  onClick={() => setAiWriterOpen((o) => !o)}
                  className="cursor-hover flex min-h-[44px] items-center gap-1 text-xs font-medium text-accent hover:underline py-1"
                >
                  <Sparkles size={12} />
                  Write with AI
                </button>
              </div>

              {aiWriterOpen && (
                <div className="animate-fade-up mt-2 rounded-xl border border-accent/30 bg-accent/5 p-3">
                  <p className="text-xs text-muted">
                    Describe what you need in a sentence or two, and I&apos;ll draft the message for you.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <input
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleWriteWithAI();
                        }
                      }}
                      placeholder="e.g. I need a chatbot for my Shopify store"
                      className="cursor-hover flex-1 min-h-[44px] rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                    <button
                      type="button"
                      onClick={handleWriteWithAI}
                      disabled={!brief.trim() || drafting}
                      className="cursor-hover flex shrink-0 min-h-[44px] items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                      {drafting ? <Loader2 size={12} className="animate-spin" /> : "Draft it"}
                    </button>
                  </div>
                </div>
              )}

              <textarea
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Tell me a bit about your project or idea..."
                rows={5}
                className="cursor-hover mt-2 w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="cursor-hover mt-1 flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
            >
              {sending ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
            {sendStatus === "sent" && (
              <p className="flex items-center gap-1.5 text-sm text-emerald-500">
                <Check size={14} /> Message sent — I&apos;ll get back to you soon.
              </p>
            )}
            {sendStatus === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong sending that. Try again, or email me directly at{" "}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>
                .
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
