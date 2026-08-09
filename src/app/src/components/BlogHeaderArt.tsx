export type ArtVariant = "flow" | "graph" | "device" | "ascent" | "layers" | "grid";

// Maps each blog post's dominant topic to a pattern variant. Add new slugs here as
// posts are added; falls back to "grid" if a slug isn't listed.
const variantBySlug: Record<string, ArtVariant> = {
  "why-python-is-ideal-for-automation": "flow",
  "n8n-vs-zapier-vs-make-automation-platform": "flow",
  "from-freelancing-to-an-ai-company": "ascent",
  "how-i-landed-my-first-ai-automation-client": "ascent",
  "fractional-cto-vs-full-time-hire": "ascent",
  "freelance-to-agency-operational-mistakes": "ascent",
  "google-ml-engineer-cert-notes": "ascent",
  "langgraph-multi-step-ai-agents-introduction": "graph",
  "customer-support-chatbot-escalation-design": "graph",
  "prompt-engineering-isnt-enough": "graph",
  "what-breaks-when-llm-goes-to-production": "grid",
  "rag-vs-fine-tuning-real-cost-comparison": "layers",
  "claude-vs-gpt-vs-gemini-freelancer-guide": "layers",
  "on-device-vs-cloud-ai-cost-latency-comparison": "device",
  "quantize-pytorch-model-for-android": "device",
  "offline-first-ai-features-android": "device",
  "on-device-clustering-with-dinov2": "device",
  "why-i-moved-to-on-device-ai": "device",
};

export function getArtVariant(slug: string): ArtVariant {
  return variantBySlug[slug] ?? "grid";
}

export default function BlogHeaderArt({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const variant = getArtVariant(slug);
  // A stable per-slug offset so patterns using the same variant don't look identical.
  const seed = Array.from(slug).reduce((a, c) => a + c.charCodeAt(0), 0);
  const rot = seed % 40;

  return (
    <svg
      viewBox="0 0 400 220"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`bg-${slug}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`line-${slug}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="50%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill={`url(#bg-${slug})`} />

      {variant === "flow" && (
        <g stroke={`url(#line-${slug})`} strokeWidth="2" fill="none" opacity="0.9">
          <path d="M-10 60 Q 100 20, 200 60 T 410 60" />
          <path d="M-10 110 Q 100 150, 200 110 T 410 110" opacity="0.6" />
          <path d="M-10 160 Q 100 130, 200 160 T 410 160" opacity="0.4" />
          {[60, 160, 260, 340].map((x, i) => (
            <circle key={x} cx={x} cy={i % 2 === 0 ? 60 : 110} r="5" fill="var(--accent-2)" stroke="none" />
          ))}
        </g>
      )}

      {variant === "graph" && (
        <g opacity="0.9">
          {[
            [80, 60], [200, 40], [320, 70], [140, 140], [280, 150], [200, 110],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="7" fill="none" stroke="var(--accent-2)" strokeWidth="2" />
              <circle cx={x} cy={y} r="2.5" fill="var(--accent-2)" />
            </g>
          ))}
          <g stroke="url(#line-${slug})" strokeWidth="1.5" opacity="0.7">
            <line x1="80" y1="60" x2="200" y2="40" />
            <line x1="200" y1="40" x2="320" y2="70" />
            <line x1="80" y1="60" x2="200" y2="110" />
            <line x1="200" y1="110" x2="140" y2="140" />
            <line x1="200" y1="110" x2="280" y2="150" />
            <line x1="200" y1="40" x2="200" y2="110" />
          </g>
        </g>
      )}

      {variant === "device" && (
        <g opacity="0.9">
          <rect x="150" y="30" width="100" height="160" rx="14" fill="none" stroke="var(--accent-2)" strokeWidth="2.5" />
          <rect x="164" y="48" width="72" height="120" rx="3" fill="var(--accent)" opacity="0.15" />
          {[70, 95, 120].map((y, i) => (
            <line key={y} x1="172" y1={y} x2={172 + 40 - i * 8} y2={y} stroke="var(--accent-2)" strokeWidth="2" />
          ))}
          <circle cx="200" cy="178" r="4" fill="var(--accent-2)" />
          <path d="M40 190 L100 150 M300 150 L360 190" stroke="url(#line-${slug})" strokeWidth="2" opacity="0.6" />
        </g>
      )}

      {variant === "ascent" && (
        <g opacity="0.9">
          {[40, 90, 140, 190, 240, 290, 340].map((x, i) => (
            <rect
              key={x}
              x={x}
              y={190 - (i + 1) * 20}
              width="30"
              height={(i + 1) * 20}
              rx="4"
              fill="var(--accent)"
              opacity={0.15 + i * 0.08}
            />
          ))}
          <path
            d="M40 170 L90 140 L140 120 L190 90 L240 70 L290 45 L340 25"
            stroke={`url(#line-${slug})`}
            strokeWidth="2.5"
            fill="none"
          />
        </g>
      )}

      {variant === "layers" && (
        <g opacity="0.9">
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={70 - i * 12}
              y={70 + i * 35}
              width="260"
              height="50"
              rx="10"
              fill="none"
              stroke="var(--accent-2)"
              strokeWidth="2"
              opacity={1 - i * 0.25}
              transform={`skewX(-6)`}
            />
          ))}
        </g>
      )}

      {variant === "grid" && (
        <g stroke="var(--accent-2)" strokeWidth="1" opacity="0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`v${i}`} x1={40 + i * 65} y1="20" x2={40 + i * 65} y2="200" />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={40 + i * 50} x2="400" y2={40 + i * 50} />
          ))}
          <rect x={100 + rot} y="80" width="130" height="70" rx="6" fill="var(--accent)" opacity="0.2" stroke="none" />
        </g>
      )}
    </svg>
  );
}
