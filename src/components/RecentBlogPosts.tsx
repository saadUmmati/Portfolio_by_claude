import Link from "next/link";
import { blogPosts } from "@/data/blog";
import Reveal from "@/components/Reveal";
import BlogHeaderArt from "@/components/BlogHeaderArt";

export default function RecentBlogPosts() {
  const recent = blogPosts.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container-page">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                Recent Blog Posts
              </span>
            </h2>
            <p className="mt-2 text-muted">Latest insights on AI, mobile, and software engineering</p>
          </div>
          <Link href="/blog" className="hidden text-sm text-accent hover:underline md:block">
            View all posts →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {recent.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/60"
              >
                <div className="h-32 w-full overflow-hidden bg-surface-2">
                  <BlogHeaderArt slug={post.slug} className="h-full w-full" />
                </div>
                <div className="p-6">
                  <p className="text-xs text-muted">{post.date}</p>
                  <h3 className="mt-2 font-semibold group-hover:text-accent">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Link href="/blog" className="mt-8 block text-sm text-accent hover:underline md:hidden">
          View all posts →
        </Link>
      </div>
    </section>
  );
}
