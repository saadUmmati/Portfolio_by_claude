import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, type BlogBlock } from "@/data/blog";
import { site } from "@/data/site";
import Reveal from "@/components/Reveal";
import BlogHeaderArt from "@/components/BlogHeaderArt";
import BlogSummarizeButton from "@/components/BlogSummarizeButton";

function toPlainText(blocks: BlogBlock[]): string {
  return blocks
    .map((b) => (b.type === "list" ? b.items.join(". ") : b.text))
    .join("\n\n");
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const ogTitle = `${post.title} - ${site.name}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: ogTitle, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="container-page mx-auto max-w-2xl py-10 sm:py-12 md:py-16">
      <Link href="/blog" className="cursor-hover flex min-h-[44px] items-center text-sm text-accent hover:underline py-1">
        ← Back to Blog
      </Link>

      <div className="mt-6 h-48 w-full overflow-hidden rounded-2xl bg-surface-2 md:h-64">
        <BlogHeaderArt slug={post.slug} className="h-full w-full" />
      </div>

      <Reveal>
        <div className="mt-6 flex items-center gap-3 text-xs text-muted">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} read</span>
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{post.title}</h1>

        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 max-w-none space-y-4">
        {post.content.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2 key={i} className="!mt-10 mb-1 text-xl font-semibold tracking-tight">
                {block.text}
              </h2>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-5 text-muted">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="leading-relaxed text-muted">
              {block.text}
            </p>
          );
        })}
      </div>

      <BlogSummarizeButton title={post.title} plainText={toPlainText(post.content)} />
    </div>
  );
}
