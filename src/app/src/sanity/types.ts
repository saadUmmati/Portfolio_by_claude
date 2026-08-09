export interface SanityImageRef {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface GalleryItem {
  label: string;
  image?: SanityImageRef;
}

export interface SanityFaq {
  question: string;
  answer: string;
}

export interface SanityService {
  slug: string;
  category: string;
  emoji: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  whatsIncluded: string[];
  deliveryDays: number;
  revisions: string;
  faqs: SanityFaq[];
  gallery: GalleryItem[];
}

export interface SanityExperience {
  slug: string;
  company: string;
  companyUrl?: string;
  logoImage?: SanityImageRef;
  logoUrl?: string;
  logoBg?: "light" | "dark";
  logoInitial: string;
  logoColor: string;
  location: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  categories: string[];
  gallery: GalleryItem[];
}

// Loosely typed -- Portable Text blocks are rendered via @portabletext/react,
// which accepts this shape without needing a strict type here.
export type PortableTextContent = Record<string, unknown>[];

export interface SanityBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  content: PortableTextContent;
}

export interface SanityTestimonial {
  name: string;
  role: string;
  company: string;
  platform: string;
  quote: string;
  initials: string;
  rating: number;
}

export interface SanityStat {
  label: string;
  target?: number;
  decimals?: number;
  suffix?: string;
  value?: string;
}
