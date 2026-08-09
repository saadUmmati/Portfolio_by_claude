import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "🧠 AI Agents & Automation",
          "🤖 On-Device & Applied AI",
          "📱 Mobile Development",
          "💻 Web & Backend / SaaS",
          "💡 Consulting & Advisory",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "emoji", title: "Emoji", type: "string" }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Shown on the services listing card",
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "text",
      rows: 3,
      description: "Shown at the top of the service detail page",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "whatsIncluded",
      title: "What's Included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "deliveryDays",
      title: "Typical Delivery (days)",
      type: "number",
      description: "Set to 0 for an ongoing engagement instead of a fixed delivery",
    }),
    defineField({ name: "revisions", title: "Revisions", type: "string" }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          name: "faq",
          fields: [
            { name: "question", type: "string" },
            { name: "answer", type: "text", rows: 3 },
          ],
        },
      ],
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
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
