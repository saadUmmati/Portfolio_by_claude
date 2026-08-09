import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { meetingTypes, scheduleStats } from "@/data/meetings";
import { site } from "@/data/site";
import Reveal from "@/components/Reveal";
import ProjectContactSection from "@/components/ProjectContactSection";

export const metadata: Metadata = {
  title: "Schedule a Meeting",
  description: "Book a 1-1 session to discuss your project or get expert advice.",
  alternates: { canonical: "/schedule" },
};

export default function SchedulePage() {
  return (
    <>
      <div className="container-page py-10 sm:py-12 md:py-16">
        <span className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {site.availability}
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Schedule a{" "}
          <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
            Meeting
          </span>
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Book a 1-1 session to discuss your project, get expert advice, or learn from my
          experience in on-device AI, automation, and full-stack engineering.
        </p>

        <Reveal>
          <div className="liquid-glass mt-10 grid grid-cols-3 gap-6 rounded-2xl p-6 sm:max-w-md">
            {scheduleStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-semibold sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <h2 className="mt-16 text-2xl font-semibold tracking-tight">Choose Your Meeting Type</h2>
        <p className="mt-2 text-muted">
          Select the meeting format that best fits your needs. All sessions are conducted via
          video call.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {meetingTypes.map((m, i) => (
            <Reveal key={m.slug} delay={i * 60}>
              <Link
                href={`/schedule/${m.slug}`}
                className="cursor-hover group flex h-full flex-col rounded-2xl border border-accent/20 bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/60"
              >
                <span className="flex w-fit items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
                  <Clock size={11} />
                  {m.duration}
                </span>
                <h3 className="mt-3 font-semibold">{m.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{m.description}</p>
                <span className="mt-4 flex items-center gap-1 text-sm font-medium text-accent">
                  Schedule Now
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          Choose a meeting type to view available time slots and book your session instantly.
          Prefer WhatsApp instead?{" "}
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="cursor-hover text-accent hover:underline"
          >
            Message me directly
          </a>
          .
        </p>
      </div>

      <ProjectContactSection />
    </>
  );
}
