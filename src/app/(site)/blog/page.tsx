import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import Reveal from "@/components/Reveal";
import BlogHeaderArt from "@/components/BlogHeaderArt";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on AI, automation, and software engineering.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="container-page py-10 sm:py-12 md:py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-3 max-w-xl text-muted">
        Insights on AI, automation, and software engineering.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {blogPosts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 60}>
            <Link
              href={`/blog/${post.slug}`}
              className="cursor-hover group block h-full overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="h-36 w-full overflow-hidden bg-surface-2">
                <BlogHeaderArt slug={post.slug} className="h-full w-full" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold group-hover:text-accent">{post.title}</h2>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span key={t} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
