export type Stat =
  | { label: string; target: number; suffix?: string; decimals?: number }
  | { label: string; value: string };

export const site = {
  // Powers canonical URLs, the sitemap, robots.txt, and Open Graph image resolution.
  url: "https://saadai.vercel.app",
  name: "Muhammad Saad Ahmed",
  shortName: "saad",
  title: "AI Engineer",
  rolesRotating: ["AI Engineer", "On-Device AI Specialist", "Automation Engineer"],
  tagline:
    "I build on-device AI, LLM-powered agents, and automation systems — from Android apps with real-time ML clustering to AI-powered products shipped end to end.",
  email: "msaadisiddiqui@gmail.com",
  whatsapp: "923125696938",
  location: "Wah Cantt, Pakistan",
  availability: "Available for New Opportunities",
  socials: {
    linkedin: "https://www.linkedin.com/in/muhammadsaadahmed/",
    linkedinCompany: "https://www.linkedin.com/company/saad-tech-works",
    github: "https://github.com/saadummati",
    youtube: "",
    twitter: "",
    instagram: "",
  },
  stats: [
    { label: "Projects Completed", target: 10, suffix: "+" },
    { label: "Success Rate", target: 98, suffix: "%" },
    { label: "LinkedIn Followers", target: 10, suffix: "k+" },
    { label: "Average Rating", target: 5, decimals: 1, suffix: " ★" },
    { label: "Available", value: "24/7" }, // not a countable single number -- shown static
  ] as Stat[],
  about: {
    heading: "Hi, I'm Muhammad Saad Ahmed — AI Engineer",
    body: `I'm a BSCS graduate (NUTECH '25) working as an AI Automation Engineer at HashDev Solutions. I previously worked as an AI Systems Engineer at CloudGate Technologies, and I'm also Co-Founder & COO at SHS Creators.

I specialize in bringing machine learning on-device — real-time clustering, ONNX-optimized models, and semantic search — into production Android apps. Beyond mobile, I build LLM-powered AI agents, chatbots, and automation systems, and work as a trained automation engineer connecting tools, APIs, and workflows end to end.`,
    specialties: [
      "On-Device AI & ML (ONNX, quantized models)",
      "AI Agents & LLM Integration",
      "Workflow & Business Process Automation",
      "Android Development (Kotlin, MVVM)",
      "AI Integration & Semantic Search (CLIP, DINOv2)",
      "Full-Stack Web Development",
      "Google Professional ML Engineer (Certified)",
      "AWS ML Specialty (Certified)",
      "AWS Certified DevOps Engineer – Professional (Certified)",
      "National Financial Literacy Program for Youth (NIBAF)",
      "Create a Website Using WordPress (Coursera)",
      "Content Creation (LinkedIn, 10,000+ followers)",
      "Mobile App Architecture",
      "API Development & Integration",
      "Team Leadership & Product Ownership",
    ],
  },
} as const;
