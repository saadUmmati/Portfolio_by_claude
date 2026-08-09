export interface MeetingType {
  slug: string;
  title: string;
  duration: string;
  description: string;
  active: boolean;
}

// Each active meeting type gets its own /schedule/[slug] booking page with a Calendly embed.
export const meetingTypes: MeetingType[] = [
  {
    slug: "technical-consultation",
    title: "Technical Consultation",
    duration: "30 min",
    description:
      "Get expert advice on your Android or web project. Discuss architecture, tech stack, and best practices.",
    active: true,
  },
  {
    slug: "on-device-ai-consultation",
    title: "On-Device AI Consultation",
    duration: "30 min",
    description:
      "Discuss whether an on-device AI feature (clustering, semantic search, classification) is feasible for your app, and how to approach it.",
    active: true,
  },
  {
    slug: "android-architecture-review",
    title: "Android Architecture Review",
    duration: "45 min",
    description:
      "A deep-dive review of your Android app's architecture, with actionable recommendations for MVVM, background work, and scalability.",
    active: true,
  },
  {
    slug: "career-mentorship",
    title: "Career & Job Search Mentorship",
    duration: "45 min",
    description:
      "One-on-one mentoring for developers navigating certifications, portfolios, or the AI/ML job search.",
    active: true,
  },
  {
    slug: "quick-questions",
    title: "Quick Questions",
    duration: "15 min",
    description: "Have a quick question? Book a short call to get immediate answers and guidance.",
    active: true,
  },
  {
    slug: "project-discussion",
    title: "Project Discussion",
    duration: "45 min",
    description: "Discuss your project requirements, timeline, and get a quote for development services.",
    active: true,
  },
  {
    slug: "freelance-contract-discussion",
    title: "Freelance / Contract Discussion",
    duration: "30 min",
    description: "Talk through scope and terms for a freelance or contract engagement.",
    active: true,
  },
  {
    slug: "general-meeting",
    title: "General Meeting",
    duration: "30 min",
    description: "Schedule a meeting for any other topic not covered above. Flexible discussion on your needs.",
    active: true,
  },
];

export const scheduleStats = [
  { label: "1-1 Meetings", value: "30+" },
  { label: "Happy Clients", value: "12+" },
  { label: "Years Experience", value: "2+" },
];
