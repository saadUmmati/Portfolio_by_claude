import Link from "next/link";
import { blogPosts } from "@/data/blog";
import Reveal from "@/components/Reveal";
import BlogHeaderArt from "@/components/BlogHeaderArt";
import SectionHeader from "@/components/kit/SectionHeader";

export default function RecentBlogPosts() {
  const recent = blogPosts.slice(0, 3);

  return (
    <section className="border-t border-ink py-20 md:py-32">
      <div className="container-page">
        <div className="flex items-end justify-between gap-8">
          <SectionHeader
            index="06"
            label="Journal"
            title="Recent writing"
            intro="Latest insights on AI, mobile, and software engineering."
          />
          <Link href="/blog" className="cursor-hover hidden shrink-0 font-mono text-label uppercase underline underline-offset-4 md:block">
            All posts &#8594;
          </Link>
        </div>

        <div className="mt-14 grid border-ink md:grid-cols-3 md:border-r [&>*]:border-b [&>*]:border-l [&>*]:border-ink">
          {recent.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="cursor-hover group flex h-full flex-col transition-colors hover:bg-accent hover:text-on-accent"
              >
                <div className="h-36 w-full overflow-hidden border-b border-ink">
                  <BlogHeaderArt slug={post.slug} className="h-full w-full" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-label uppercase">
                    {String(i + 1).padStart(2, "0")} / {post.date}
                  </p>
                  <h3 className="mt-4 text-xl leading-snug font-semibold">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{post.excerpt}</p>
                  <span className="mt-auto pt-6 font-mono text-label uppercase underline underline-offset-4">Read &#8594;</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Link href="/blog" className="mt-8 block font-mono text-label uppercase underline underline-offset-4 md:hidden">
          All posts &#8594;
        </Link>
      </div>
    </section>
  );
}
