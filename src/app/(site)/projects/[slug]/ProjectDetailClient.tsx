"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowUpRight, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/data/projects";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  async function handleExplain() {
    if (loading) return;
    setLoading(true);
    setExplanation(null);
    try {
      const res = await fetch("/api/explain-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: project.title,
          description: project.description,
          longDescription: project.longDescription,
          tags: project.tags,
          code: project.codeSnippet.code,
        }),
      });
      const data = await res.json();
      setExplanation(data.explanation);
    } catch {
      setExplanation("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-page py-10 sm:py-12 md:py-16">
      <Link href="/projects" className="flex items-center gap-1.5 text-sm text-accent hover:underline">
        <ArrowLeft size={14} />
        Back to Projects
      </Link>

      <div className="mt-6 relative h-56 w-full overflow-hidden rounded-2xl bg-surface-2 md:h-80">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}, a ${project.category.toLowerCase()} project`}
            fill
            sizes="(min-width: 768px) 800px, 100vw"
            unoptimized
            className="object-cover"
            priority
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${project.gradient}`} />
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-xs font-semibold tracking-wide text-accent">{project.category}</span>
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h1>
      <div className="mt-4 max-w-2xl space-y-3 text-lg text-muted">
        {project.longDescription.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="cursor-hover liquid-glass-light flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/90 transition-transform hover:scale-105"
        >
          <FaGithub size={14} /> View Code
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="cursor-hover liquid-glass-light flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/90 transition-transform hover:scale-105"
          >
            Live Demo <ArrowUpRight size={14} />
          </a>
        )}
      </div>

      {/* Extra screenshots, when present */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {project.gallery.map((g) => (
            <div key={g.label} className="overflow-hidden rounded-2xl border border-border bg-surface-2">
              <div className="relative h-48 w-full">
                <Image src={g.src} alt={g.label} fill sizes="400px" unoptimized className="object-cover" />
              </div>
              <p className="p-3 text-xs text-muted">{g.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* My role, when present */}
      {project.roleHighlights && project.roleHighlights.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold">My Role</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.roleHighlights.map((r) => (
              <div key={r.title} className="rounded-2xl border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-accent">{r.title}</p>
                <p className="mt-1.5 text-sm text-muted">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code snippet */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">A Look at the Code</h2>
        <p className="mt-1 text-sm text-muted">
          A representative snippet showing the core approach -- not the full source.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-[#0a0a0f] p-5">
          <div className="mb-3 flex items-center gap-2 text-xs text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-2 font-mono">{project.codeSnippet.language}</span>
          </div>
          <pre className="font-mono text-[13px] leading-relaxed text-foreground/90">
            <code>{project.codeSnippet.code}</code>
          </pre>
        </div>
      </div>

      {/* AI explainer */}
      <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
        {!explanation && !loading && (
          <button
            onClick={handleExplain}
            className="cursor-hover flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Sparkles size={15} />
            Explain This Project
          </button>
        )}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 size={16} className="animate-spin text-accent" />
            Looking at the code...
          </div>
        )}
        {explanation && !loading && (
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase">
              <Sparkles size={13} /> AI Explanation
            </p>
            <div className="chat-markdown mt-3 text-sm leading-relaxed text-foreground/90">
              <ReactMarkdown>{explanation}</ReactMarkdown>
            </div>
            <button
              onClick={handleExplain}
              className="cursor-hover mt-4 text-xs text-accent hover:underline"
            >
              Regenerate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
