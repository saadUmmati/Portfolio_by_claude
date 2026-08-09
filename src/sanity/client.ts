import { createClient } from "next-sanity";

// Falls back to a placeholder when unset so client construction never throws (and
// therefore never crashes the build) in an environment without Sanity configured yet.
// Callers that actually fetch data (e.g. src/sanity/resume.ts) separately check for
// the real env var first and skip calling Sanity entirely when it's missing.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "not-configured";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fast, cached reads -- fine for content that doesn't need to be instant
  perspective: "published",
});

// Separate client for the migration script and any server-side writes -- uses the
// write token and bypasses the CDN so it always sees fresh data immediately after a write.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
