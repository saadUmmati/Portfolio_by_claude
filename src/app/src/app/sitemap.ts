import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/services", priority: 0.9, freq: "weekly" as const },
    { path: "/blog", priority: 0.8, freq: "weekly" as const },
    { path: "/testimonials", priority: 0.6, freq: "monthly" as const },
    { path: "/schedule", priority: 0.8, freq: "monthly" as const },
    { path: "/links", priority: 0.4, freq: "monthly" as const },
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
