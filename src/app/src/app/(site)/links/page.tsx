import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { linksPage } from "@/data/misc";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Links",
  description: "All my links in one place.",
  alternates: { canonical: "/links" },
};

export default function LinksPage() {
  return (
    <div className="container-page mx-auto max-w-xl py-10 sm:py-12 md:py-16">
      <div className="text-center">
        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-border">
          <Image
            src="/images/profile-image.jpg"
            alt={site.name}
            fill
            sizes="192px"
            quality={100}
            className="object-cover"
          />
        </div>
        <h1 className="mt-4 text-2xl font-semibold">{site.name}</h1>
        <p className="mt-1 text-sm text-accent">{site.title}</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{linksPage.intro}</p>
      </div>

      <div className="mt-10 space-y-8">
        {linksPage.groups.map((group) => (
          <div key={group.heading}>
            <p className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
              {group.heading}
            </p>
            <div className="space-y-2.5">
              {group.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5 transition-colors hover:border-accent/60"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
                    <item.Icon size={17} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{item.label}</span>
                    {item.description && (
                      <span className="block text-xs text-muted">{item.description}</span>
                    )}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-muted transition-colors group-hover:text-accent"
                  />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
