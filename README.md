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

---

## Additional README details (added)

### Features
- Fast SSR/SSG pages with Next.js (App Router) and TypeScript
- Tailwind CSS for utility-first styling and easy design adjustments
- Pre-built sections: hero, services, timeline, testimonials, blog, links, chat
- Simple data-driven personalization: edit `src/data/*.ts` to change content
- Embedded Calendly scheduling and optional AI chat integration (Claude/Anthropic)

### Requirements
- Node.js 18.x or later recommended
- npm (or Yarn) installed

### Local development
- Start dev server:
  ```bash
  npm run dev
  ```
- Build for production locally:
  ```bash
  npm run build
  npm start
  ```
(If `npm start` is not yet defined in package.json, use `next start` after a successful build.)

### Environment variables
- ANTHROPIC_API_KEY — (optional) Claude/Anthropic API key used by `/chat`.
- NEXT_PUBLIC_CALENDLY_URL — (optional) override the Calendly link embedded on schedule pages.

Create a `.env.local` at the repo root and restart the dev server after changing env vars.

### Personalization guide
- Most site content lives in `src/data/` — edit `site.ts`, `services.ts`, `experience.ts`,
  `meetings.ts`, `blog.ts`, and `testimonials.ts` to update copy and assets.
- Replace placeholder images, avatars, and logos in the `public/` folder where applicable.
- Update the accent color in `src/app/globals.css` (CSS variable `--accent`) to match your brand.

### Deployment
- Vercel is recommended for zero-config deploys of Next.js apps. Connect the repo and
  Vercel will handle builds automatically.
- Alternatively, any platform that supports Next.js (Node 18+) will work. Make sure to
  set your environment variables in the hosting platform (ANTHROPIC_API_KEY, NEXT_PUBLIC_CALENDLY_URL).

### Troubleshooting & tips
- If the chat page shows "not connected yet", confirm `ANTHROPIC_API_KEY` is set and valid.
- If Calendly doesn't load, verify `NEXT_PUBLIC_CALENDLY_URL` or the embedded link in
  `src/components/ScheduleEmbed.tsx`.
- Tailwind styles not applying? Ensure `globals.css` is imported in your root layout.

### Contributing
If you want to make changes or improvements:
1. Create a new branch from the default branch.
2. Open a PR with a clear description of your changes.
3. Keep commits focused and add a short, explanatory commit message.

If you'd like, I can also:
- Sync the top-level README additions into `src/app/README.md` so both files match.
- Add a short 'How to personalize' checklist or PR template.

### License
Include your preferred license file at the repo root (e.g., `LICENSE`). If none is present,
this repo currently has no explicit license — add one before sharing commercially.

### Contact
For questions or help customizing this repo, contact Saad via the details in `src/data/site.ts`.

---

