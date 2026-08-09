import { defineField, defineType } from "sanity";

export const experienceEntry = defineType({
  name: "experienceEntry",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (stable ID)",
      type: "slug",
      options: { source: "company" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "companyUrl", title: "Company URL", type: "url" }),
    defineField({
      name: "logoImage",
      title: "Logo (upload)",
      type: "image",
      description: "Preferred over the URL field below when both are set",
    }),
    defineField({
      name: "logoUrl",
      title: "Logo (external URL)",
      type: "url",
      description: "Fallback if you don't want to upload the logo directly",
    }),
    defineField({
      name: "logoBg",
      title: "Logo Badge Background",
      type: "string",
      options: { list: ["light", "dark"] },
      description: "Use 'dark' if the logo is white/light and disappears on a light badge",
    }),
    defineField({ name: "logoInitial", title: "Fallback Letter", type: "string" }),
    defineField({ name: "logoColor", title: "Fallback Badge Color", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "period", title: "Period", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["AI", "Mobile Apps", "Websites", "Consultations", "Content Creation"],
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers show first (most recent role = 1)",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryImage",
          fields: [
            { name: "label", type: "string" },
            { name: "image", type: "image", options: { hotspot: true } },
          ],
          preview: { select: { title: "label", media: "image" } },
        },
      ],
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "company", subtitle: "role" },
  },
});
