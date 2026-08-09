"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services, serviceCategories } from "@/data/services";
import Reveal from "@/components/Reveal";

export default function ServicesPage() {
  const [category, setCategory] = useState("All Categories");

  const filtered =
    category === "All Categories"
      ? services
      : services.filter((s) => s.category === category);

  return (
    <div className="container-page py-10 sm:py-12 md:py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Professional Services</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {services.length} services across AI agents & automation, on-device AI, mobile,
        web, and consulting. Filter by category or browse the full list.
      </p>

      <p className="mt-8 text-xs uppercase tracking-wide text-muted">Filters</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {serviceCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              category === c
                ? "border-accent bg-accent text-white"
                : "border-border text-muted hover:bg-surface"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted">{filtered.length} services found</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 80}>
            <Link
              href={`/services/${s.slug}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60"
            >
              {s.gallery[0]?.src ? (
                <div className="relative h-32 overflow-hidden rounded-xl bg-surface-2">
                  <Image
                    src={s.gallery[0].src}
                    alt={s.gallery[0].label}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center rounded-xl bg-surface-2 text-5xl">
                  {s.emoji}
                </div>
              )}
              <span className="mt-4 text-xs text-muted">{s.category}</span>
              <h3 className="mt-2 font-semibold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{s.shortDescription}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.slice(0, 2).map((t) => (
                  <span key={t} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
                    {t}
                  </span>
                ))}
                {s.tags.length > 2 && (
                  <span className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
                    +{s.tags.length - 2} more
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted">Pricing</p>
                  <p className="font-semibold">Custom Quote</p>
                </div>
                <span className="text-sm text-accent">View Details →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
