"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { site } from "@/data/site";

export default function ProjectContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Project inquiry from ${name || "your website"}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${details}`
  )}`;

  const contactCards = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
    {
      label: "LinkedIn",
      value: site.socials.linkedin.replace("https://www.", ""),
      href: site.socials.linkedin,
      Icon: FaLinkedin,
    },
    {
      label: "GitHub",
      value: site.socials.github.replace("https://", ""),
      href: site.socials.github,
      Icon: FaGithub,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-xs font-medium tracking-wide text-accent">/ OR, SEND DETAILS DIRECTLY</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Prefer not to book a slot yet?
          </h2>
          <p className="mt-3 max-w-md text-muted">
            Send over your project details and I&apos;ll get back to you directly —
            useful if you&apos;re not sure yet which meeting type above fits.
          </p>

          <div className="mt-8 space-y-3">
            {contactCards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/60"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <c.Icon size={16} />
                </span>
                <span>
                  <span className="block text-xs text-muted">{c.label}</span>
                  <span className="block text-sm font-medium">{c.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Code-editor styled message form */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </span>
              <span className="font-mono text-xs text-muted">new_message.tsx</span>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              online
            </span>
          </div>

          <form
            className="space-y-4 p-5"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailtoHref;
            }}
          >
            <div>
              <label className="font-mono text-xs text-muted">your_name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted">email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="font-mono text-xs text-muted">project_details</label>
                <span className="text-xs text-muted">{details.length}/500</span>
              </div>
              <textarea
                required
                maxLength={500}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="What would you like to build or automate?"
                rows={5}
                className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Send message
              <Send size={15} />
            </button>
            <p className="text-center text-xs text-muted">
              Opens your email client with this message pre-filled.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
