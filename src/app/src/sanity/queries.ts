import { groq } from "next-sanity";

export const allServicesQuery = groq`
  *[_type == "service"] | order(category asc, title asc) {
    "slug": slug.current,
    category, emoji, title, shortDescription, longDescription, tags,
    whatsIncluded, deliveryDays, revisions, faqs,
    gallery[] { label, image }
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    "slug": slug.current,
    category, emoji, title, shortDescription, longDescription, tags,
    whatsIncluded, deliveryDays, revisions, faqs,
    gallery[] { label, image }
  }
`;

export const allServiceSlugsQuery = groq`*[_type == "service"]{ "slug": slug.current }`;

export const allExperienceQuery = groq`
  *[_type == "experienceEntry"] | order(order asc) {
    "slug": slug.current,
    company, companyUrl, logoImage, logoUrl, logoBg, logoInitial, logoColor,
    location, role, period, description, tags, categories,
    gallery[] { label, image }
  }
`;

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    "slug": slug.current,
    title, excerpt, publishedAt, readTime, tags, content
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    "slug": slug.current,
    title, excerpt, publishedAt, readTime, tags, content
  }
`;

export const allBlogSlugsQuery = groq`*[_type == "blogPost"]{ "slug": slug.current }`;

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt asc) {
    name, role, company, platform, quote, initials, rating
  }
`;

export const siteStatsQuery = groq`*[_type == "siteStats"][0] { stats }`;
