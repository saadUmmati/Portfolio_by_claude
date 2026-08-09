import { client } from "./client";
import { resumeUrlQuery } from "./queries";

const FALLBACK_RESUME = "/resume/resume.pdf";

// Tries Sanity first (so uploading a new PDF via /studio takes effect immediately),
// falls back to the static bundled copy if Sanity has nothing set yet, the env vars
// aren't configured, or the request fails for any reason.
export async function getResumeUrl(): Promise<string> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return FALLBACK_RESUME;
    const url = await client.fetch<string | null>(resumeUrlQuery);
    return url || FALLBACK_RESUME;
  } catch {
    return FALLBACK_RESUME;
  }
}
