"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, 8000);
    return () => clearInterval(id);
  }, [paused]);

  const project = projects[index];

  function prev() {
    setIndex((i) => (i - 1 + projects.length) % projects.length);
  }
  function next() {
    setIndex((i) => (i + 1) % projects.length);
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="liquid-glass w-full max-w-2xl rounded-3xl p-4"
    >
      <div
        key={project.title}
        className={`animate-fade-up relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br sm:h-80 ${project.gradient}`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}, a ${project.category.toLowerCase()} project`}
            fill
            sizes="(min-width: 640px) 640px, 100vw"
            className="object-cover"
            priority={index === 0}
          />
        ) : (
          <span className="text-2xl font-semibold text-white/90 drop-shadow sm:text-3xl">
            {project.title}
          </span>
        )}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-accent">
          {project.category}
        </span>
        <span className="text-sm text-muted">
          {index + 1} / {projects.length}
        </span>
      </div>

      <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
      <p className="mt-1.5 text-base text-muted">{project.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="cursor-hover flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            View Project
            <ArrowUpRight size={15} />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="cursor-hover flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground hover:underline"
            >
              Live Demo
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Previous project"
            onClick={prev}
            className="cursor-hover flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 hover:bg-surface-2"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Next project"
            onClick={next}
            className="cursor-hover flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 hover:bg-surface-2"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
