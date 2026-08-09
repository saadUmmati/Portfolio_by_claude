import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "resume",
      title: "Resume (PDF)",
      type: "file",
      options: { accept: ".pdf" },
      description: "Upload a new PDF here to replace the resume download on the site instantly",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
