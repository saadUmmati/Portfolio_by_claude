import { defineField, defineType } from "sanity";

export const siteStats = defineType({
  name: "siteStats",
  title: "Homepage Stats",
  type: "document",
  fields: [
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            { name: "label", type: "string", title: "Label" },
            {
              name: "target",
              type: "number",
              title: "Numeric Target",
              description: "Leave empty for a non-numeric stat like '24/7' -- fill 'Static Value' instead",
            },
            { name: "decimals", type: "number", title: "Decimal Places", initialValue: 0 },
            { name: "suffix", type: "string", title: "Suffix", description: "e.g. '+', '%', 'k+'" },
            {
              name: "value",
              type: "string",
              title: "Static Value",
              description: "Used instead of Numeric Target for things like '24/7'",
            },
          ],
          preview: {
            select: { title: "label", target: "target", value: "value", suffix: "suffix" },
            prepare({ title, target, value, suffix }) {
              return { title, subtitle: value ?? `${target ?? ""}${suffix ?? ""}` };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage Stats" }),
  },
});
