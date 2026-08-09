/**
 * One-time (but safe to re-run) migration: pushes the existing static data files
 * into Sanity. Uses deterministic document IDs (createOrReplace), so running this
 * again just overwrites with the latest static data rather than duplicating.
 *
 * Run with: npx tsx scripts/migrate-to-sanity.ts
 * Requires .env.local to have NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * and SANITY_API_TOKEN (with write access) set.
 */
import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import { services } from "../src/data/services";
import { experience } from "../src/data/experience";
import { blogPosts, type BlogBlock } from "../src/data/blog";
import { testimonials } from "../src/data/testimonials";
import { site } from "../src/data/site";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN!;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2026-01-01", token, useCdn: false });

const PUBLIC_DIR = path.join(__dirname, "..", "public");

// Cache so a physical file that's reused across multiple entries (e.g. the same
// gallery image referenced by both an experience entry and a service) is only
// uploaded to Sanity once.
const assetCache = new Map<string, string>(); // local path -> asset _id

async function uploadImage(publicPath: string): Promise<string | null> {
  if (assetCache.has(publicPath)) return assetCache.get(publicPath)!;
  const fullPath = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
  if (!fs.existsSync(fullPath)) {
    console.warn("  ! image not found on disk, skipping:", publicPath);
    return null;
  }
  const buffer = fs.readFileSync(fullPath);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(fullPath),
  });
  assetCache.set(publicPath, asset._id);
  return asset._id;
}

async function imageRef(publicPath: string) {
  const assetId = await uploadImage(publicPath);
  if (!assetId) return undefined;
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: assetId } };
}

async function migrateGallery(gallery: { label: string; src?: string }[]) {
  const out = [];
  for (const g of gallery) {
    const image = g.src ? await imageRef(g.src) : undefined;
    out.push({ _key: cryptoKey(), label: g.label, ...(image ? { image } : {}) });
  }
  return out;
}

function cryptoKey() {
  return Math.random().toString(36).slice(2, 10);
}

// Converts the site's simple { type: p | h2 | list } blocks into Sanity's Portable Text.
function toPortableText(blocks: BlogBlock[]) {
  const out: Record<string, unknown>[] = [];
  for (const b of blocks) {
    if (b.type === "p" || b.type === "h2") {
      out.push({
        _type: "block",
        _key: cryptoKey(),
        style: b.type === "h2" ? "h2" : "normal",
        markDefs: [],
        children: [{ _type: "span", _key: cryptoKey(), text: b.text, marks: [] }],
      });
    } else if (b.type === "list") {
      for (const item of b.items) {
        out.push({
          _type: "block",
          _key: cryptoKey(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: cryptoKey(), text: item, marks: [] }],
        });
      }
    }
  }
  return out;
}

// "27 Jun 2026" / "14 Jul 2026" -> "2026-06-27". Falls back to the 1st of the month
// for the two older stub posts that only have "June 2026" style dates.
function parseDate(display: string): string {
  const months: Record<string, string> = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
    Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
    January: "01", February: "02", March: "03", April: "04", June: "06",
    July: "07", August: "08", September: "09", October: "10", November: "11", December: "12",
  };
  const full = display.match(/^(\d{1,2})\s+(\w+)\s+(\d{4})$/);
  if (full) {
    const [, day, mon, year] = full;
    return `${year}-${months[mon] ?? "01"}-${day.padStart(2, "0")}`;
  }
  const monthYear = display.match(/^(\w+)\s+(\d{4})$/);
  if (monthYear) {
    const [, mon, year] = monthYear;
    return `${year}-${months[mon] ?? "01"}-01`;
  }
  return "2026-01-01";
}

async function migrateServices() {
  console.log(`\nMigrating ${services.length} services...`);
  for (const s of services) {
    process.stdout.write(`  ${s.slug}... `);
    const gallery = await migrateGallery(s.gallery);
    await client.createOrReplace({
      _id: `service-${s.slug}`,
      _type: "service",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      category: s.category,
      emoji: s.emoji,
      shortDescription: s.shortDescription,
      longDescription: s.longDescription,
      tags: s.tags,
      whatsIncluded: s.whatsIncluded,
      deliveryDays: s.deliveryDays,
      revisions: s.revisions,
      faqs: s.faqs.map((f) => ({ _key: cryptoKey(), ...f })),
      gallery,
    });
    console.log("done");
  }
}

async function migrateExperience() {
  console.log(`\nMigrating ${experience.length} experience entries...`);
  let order = 1;
  for (const e of experience) {
    process.stdout.write(`  ${e.id}... `);
    const gallery = await migrateGallery(e.gallery);
    const isLocalLogo = e.logoSrc?.startsWith("/");
    const logoImage = isLocalLogo ? await imageRef(e.logoSrc!) : undefined;
    await client.createOrReplace({
      _id: `experience-${e.id}`,
      _type: "experienceEntry",
      company: e.company,
      slug: { _type: "slug", current: e.id },
      companyUrl: e.companyUrl,
      ...(logoImage ? { logoImage } : {}),
      ...(!isLocalLogo && e.logoSrc ? { logoUrl: e.logoSrc } : {}),
      logoBg: e.logoBg,
      logoInitial: e.logoInitial,
      logoColor: e.logoColor,
      location: e.location,
      role: e.role,
      period: e.period,
      description: e.description,
      tags: e.tags,
      categories: e.categories,
      order: order++,
      gallery,
    });
    console.log("done");
  }
}

async function migrateBlog() {
  console.log(`\nMigrating ${blogPosts.length} blog posts...`);
  for (const p of blogPosts) {
    process.stdout.write(`  ${p.slug}... `);
    await client.createOrReplace({
      _id: `blogPost-${p.slug}`,
      _type: "blogPost",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      excerpt: p.excerpt,
      publishedAt: parseDate(p.date),
      readTime: p.readTime,
      tags: p.tags,
      content: toPortableText(p.content),
    });
    console.log("done");
  }
}

async function migrateTestimonials() {
  console.log(`\nMigrating ${testimonials.length} testimonials...`);
  let i = 1;
  for (const t of testimonials) {
    process.stdout.write(`  ${t.name}... `);
    await client.createOrReplace({
      _id: `testimonial-${i++}`,
      _type: "testimonial",
      name: t.name,
      role: t.role,
      company: t.company,
      platform: t.platform,
      quote: t.quote,
      initials: t.initials,
      rating: t.rating,
    });
    console.log("done");
  }
}

async function migrateStats() {
  console.log("\nMigrating homepage stats...");
  await client.createOrReplace({
    _id: "siteStats",
    _type: "siteStats",
    stats: site.stats.map((s) => ({ _key: cryptoKey(), ...s })),
  });
  console.log("  done");
}

async function main() {
  console.log(`Migrating to Sanity project ${projectId} (dataset: ${dataset})`);
  await migrateServices();
  await migrateExperience();
  await migrateBlog();
  await migrateTestimonials();
  await migrateStats();
  console.log("\nAll done.");
}

main().catch((err) => {
  console.error("\nMigration failed:", err);
  process.exit(1);
});
