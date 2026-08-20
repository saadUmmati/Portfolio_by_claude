import { techIconRows } from "@/data/techIcons";

// Repeat each row enough times that its total width comfortably exceeds any
// viewport (even ultra-wide desktops), so the -50% loop never shows a gap.
const REPEATS = 5;

// Each row scrolls at its own (slow) relative speed, alternating direction.
const ROW_DURATIONS = [150, 180]; // seconds -- higher = slower

export default function TechMarquee() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container-page mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Expertise Across
          <br />
          <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
            Modern AI Technologies
          </span>
          <br />
          <span className="inline-flex items-center gap-3">
            <span aria-hidden>🧠</span> &amp; Frameworks
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Building on-device AI, LLM agents, and automation systems with tools across
          machine learning, generative AI, mobile, and web technologies
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {techIconRows.map((row, i) => {
          const longRow = Array(REPEATS).fill(row).flat();
          const duration = ROW_DURATIONS[i % ROW_DURATIONS.length];
          const reverse = i % 2 === 1;
          return (
            <div key={i} className="marquee-row overflow-hidden py-6">
              <div
                className="marquee-track flex w-max gap-6"
                style={
                  {
                    "--marquee-duration": `${duration}s`,
                    "--marquee-direction": reverse ? "reverse" : "normal",
                  } as React.CSSProperties
                }
              >
                {[...longRow, ...longRow].map((item, j) => (
                  <div
                    key={`${item.label}-${j}`}
                    className="group relative flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface transition-all duration-300 hover:z-10 hover:scale-110 hover:border-accent"
                  >
                    <div className="transition-all duration-300 group-hover:blur-[2px] group-hover:opacity-40">
                      <item.Icon size={56} color={item.color} />
                    </div>
                    <span className="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-foreground opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
