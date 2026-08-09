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

## Profile — details extracted from the repository (all available personal data)

Below I've gathered every personal detail present in the repository files (site data, experience, meetings, and related data files). Review for accuracy and remove anything you do not want published.

### Canonical identity
- Name: Muhammad Saad Ahmed
- Short name / handle: saad
- Public site URLs found in repo: https://saadai.vercel.app, https://saadahmed.dev
- Title / primary role: AI Engineer
- Rotating roles: AI Engineer; On-Device AI Specialist; Automation Engineer
- Tagline: I build on-device AI, LLM-powered agents, and automation systems — from Android apps with real-time ML clustering to AI-powered products shipped end to end.
- Availability: Available for New Opportunities

### Contact & socials
- Email: msaadisiddiqui@gmail.com
- WhatsApp: +92 312 5696938 (stored as 923125696938 in repo)
- Location: Wah Cantt, Pakistan
- LinkedIn: https://www.linkedin.com/in/muhammadsaadahmed/
- LinkedIn (company): https://www.linkedin.com/company/saad-tech-works
- GitHub: https://github.com/saadummati
- YouTube / Twitter / Instagram: empty in repo

### Stats (as shown on site)
- Projects Completed: 10+
- Success Rate: 98%
- LinkedIn Followers: 10k+
- Average Rating: 5.0 ★
- Availability: 24/7 (static value)
- Schedule stats: 1-1 Meetings: 30+; Happy Clients: 12+; Years Experience: 2+

### About / Bio (extracted headings & summary)
- About heading: "Hi, I'm Muhammad Saad Ahmed — AI Engineer"
- Bio (summary present in site.ts):
  - BSCS graduate (NUTECH '25)
  - Current role (repo): AI Automation Engineer at HashDev Solutions (July 2026 - Present)
  - Previous roles: AI Systems Engineer at CloudGate Technologies (March 2026 - July 2026); Co-Founder & COO at SHS Creators (2025 - 2026); LinkedIn Creator at Naano (June 2026 - Present); Prompt Engineer at OptiExperts (Sep 2024 - Mar 2025)
  - Focus areas: on-device ML (ONNX, quantized models), LLM-powered agents, workflow automation, Android (Kotlin), semantic search, full-stack web development, and product/leadership responsibilities.

### Specialties, certifications & notable skills (copied from site.ts specialties list)
- On-Device AI & ML (ONNX, quantized models)
- AI Agents & LLM Integration
- Workflow & Business Process Automation
- Android Development (Kotlin, MVVM)
- AI Integration & Semantic Search (CLIP, DINOv2)
- Full-Stack Web Development
- Google Professional ML Engineer (Certified)
- AWS ML Specialty (Certified)
- AWS Certified DevOps Engineer – Professional (Certified)
- National Financial Literacy Program for Youth (NIBAF)
- Create a Website Using WordPress (Coursera)
- Content Creation (LinkedIn, 10,000+ followers)
- Mobile App Architecture
- API Development & Integration
- Team Leadership & Product Ownership

### Work experience (entries extracted from src/data/experience.ts)
- HashDev Solutions — AI Automation Engineer (Onsite), July 2026 - Present
  - Company URL: https://hashdevsol.com
  - Tags: AI Automation, Workflow Automation, AI Agents
  - Gallery artifacts referenced (local paths): agent-tool-calling-diagram, n8n-workflow-diagram, model-pipeline-diagram, architecture-review-notes

- CloudGate Technologies — AI Systems Engineer (Onsite), March 2026 - July 2026
  - Company URL: https://www.cloudgatetechnologies.com
  - Focus: On-device AI features (ARCore + depth & ONNX), ClipGallery on-device gallery app, Android/Kotlin
  - Tags: On-Device AI, ONNX, Android, Kotlin, ARCore, MVVM

- SHS Creators — Co-Founder & COO (Onsite), 2025 - 2026
  - Company URL: https://shscreators.com
  - Focus: AI automation & digital marketing agency, AI chatbot and workflow automation delivery
  - Tags: Leadership, AI Agents, Automation, Operations

- Naano — LinkedIn Creator (Remote), June 2026 - Present
  - Company URL: https://www.naano.xyz
  - Tags: LinkedIn, Content Creation, B2B Marketing

- OptiExperts — Prompt Engineer / Front-End Developer (Remote/Intern), Sep 2024 - Mar 2025
  - Company URL: https://optiexperts.com
  - Tags: Prompt Engineering, LLMs, ChatBots (Prompt Engineer entry); Shopify/Front-End/E-commerce (Front-End entry in app copy)

(Note: some role titles vary slightly between `src/data/experience.ts` and `src/app/src/data/experience.ts`; I included both inferred variants where relevant.)

### Meetings & booking (from src/data/meetings.ts)
Active meeting types present in repo (each has its own `/schedule/[slug]` page):
- Technical Consultation — 30 min — "Get expert advice on your Android or web project. Discuss architecture, tech stack, and best practices." (active)
- On-Device AI Consultation — 30 min — "Discuss whether an on-device AI feature..." (active)
- Android Architecture Review — 45 min — Deep-dive review of Android architecture (active)
- Career & Job Search Mentorship — 45 min — Mentoring for developers (active)
- Quick Questions — 15 min — Short calls for immediate answers (active)
- Project Discussion — 45 min — Project scoping and quotes (active)
- Freelance / Contract Discussion — 30 min — Scope and terms discussion (active)
- General Meeting — 30 min — Flexible discussion (active)

### Notes & places to review in the repo
- Primary content location: `src/data/site.ts` (and a duplicate under `src/app/src/data/site.ts`). Update this file to change contact, bio, socials, specialties, and stats.
- Work experience details: `src/data/experience.ts` and `src/app/src/data/experience.ts`.
- Meeting types & schedule stats: `src/data/meetings.ts`.
- Services listing (descriptions, FAQs, pricing placeholders): `src/data/services.ts`.

---

If you'd like, I can now:
- Redact or omit sensitive fields (email, WhatsApp) before adding this section to the public README, or mark them as "private".
- Synchronize this profile section into `src/app/README.md` so both READMEs match.
- Generate a short, privacy-safe public summary that excludes contact details and private identifiers for publishing on public sites.

Tell me which you'd prefer and I'll update the README accordingly.