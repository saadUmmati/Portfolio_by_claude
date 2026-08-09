# Saad Ahmed — Portfolio

A Next.js (App Router) + TypeScript + Tailwind CSS portfolio, structurally cloned from
shajeelafzal.com and tailored with Saad's real info where available. Sections/content
not yet personalized are clearly marked with `TODO` or "placeholder" comments in
`src/data/*.ts`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

- `src/app/` — routes: home, /services, /services/[slug], /blog, /blog/[slug],
  /testimonials, /schedule, /schedule/[slug], /chat, /links, /api/chat
- `src/components/` — reusable UI sections (Hero, About, ExperienceTimeline, etc.)
- `src/data/` — all editable content lives here. Start here to personalize the site:
  - `site.ts` — name, bio, stats, contact/socials, brand accent color
  - `experience.ts` — work history / timeline
  - `services.ts` — services offered, pricing tiers, per-service FAQs & testimonials
  - `meetings.ts` — meeting types shown on the /schedule hub page
  - `blog.ts` — blog posts (currently placeholder — replace with your real writing)
  - `testimonials.ts` — client testimonials (currently placeholder)
  - `misc.ts` — FAQ, links page
  - `techIcons.tsx` — tech stack marquee icons

## Calendly (Schedule pages)

Already connected — every `/schedule/[slug]` page embeds `https://calendly.com/saadiahmed`
by default (all 4 active meeting types share this one link, as you requested). To point it
at a different link later, set `NEXT_PUBLIC_CALENDLY_URL` in `.env.local` and restart the
dev server, or edit the default directly in `src/components/ScheduleEmbed.tsx`. If you ever
want a separate Calendly event per meeting type instead of one shared link, that same file
is where you'd add a URL prop and pass a different one from each `/schedule/[slug]` page.

## Connecting the AI chat assistant (/chat)

1. Add your Anthropic API key to `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
2. Restart the dev server. The `/chat` page calls `src/app/api/chat/route.ts`, which
   forwards messages to Claude with a system prompt built from `site.ts`. Without a key,
   it shows a friendly "not connected yet" message instead of erroring.
3. Prefer OpenAI or another provider? Swap the `fetch` call inside
   `src/app/api/chat/route.ts` — the frontend only expects `{ reply: string }` back.

## What's placeholder vs. real

Real (already filled in from your info):
- Name, email, LinkedIn, GitHub, location
- Work experience (CloudGate, SHS Creators, MindByte Studios, freelance projects, OptiExperts)
- Certifications, specialties, about bio
- 4 of the 8 meeting types on /schedule, tailored to your actual work

Still placeholder — replace before launch:
- WhatsApp number in `site.ts`
- Stats numbers (years experience, projects completed, schedule stats) in `site.ts` and `meetings.ts`
- Blog posts in `blog.ts`
- Testimonials in `testimonials.ts` and per-service testimonials in `services.ts`
- Service pricing/review counts/gallery labels in `services.ts`
- The 🎨 UI/UX Design and 🔧 Maintenance & Support services — included to mirror the
  reference site's 5-category structure; remove or repurpose if not relevant to you
- Brand accent color (`--accent` in `globals.css`) — currently a neutral purple
- Calendly link is live; Anthropic API key still needed (see above)
