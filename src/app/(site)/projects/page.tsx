import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Real projects across on-device AI, computer vision, mobile, and full-stack web.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="container-page py-10 sm:py-12 md:py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {projects.length} real projects spanning on-device AI, computer vision, mobile
        development, and full-stack web — each with a real code snippet and an AI
        walkthrough of how it works.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 80}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/60"
            >
              <div className="relative h-44 w-full overflow-hidden bg-surface-2">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={`Screenshot of ${p.title}, a ${p.category.toLowerCase()} project`}
                    fill
                    sizes="400px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className={`h-full w-full bg-gradient-to-br ${p.gradient}`} />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold tracking-wide text-accent">
                  {p.category}
                </span>
                <h3 className="mt-2 font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 border-t border-border pt-4 text-sm text-accent">
                  View Project
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-sm text-muted">
          More projects and experiments live on GitHub.
        </p>
        <a
          href={site.socials.github}
          target="_blank"
          rel="noreferrer"
          className="cursor-hover mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          github.com/saadummati
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
