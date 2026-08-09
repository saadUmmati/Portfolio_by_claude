import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: { list: ["LinkedIn", "Upwork", "Fiverr", "Google", "Client"] },
    }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "initials",
      title: "Initials",
      type: "string",
      description: "Shown in the avatar circle, e.g. 'SK'",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      validation: (r) => r.min(1).max(5),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "company" },
  },
});
