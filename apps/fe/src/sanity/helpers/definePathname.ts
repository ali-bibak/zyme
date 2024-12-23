import { defineField } from "sanity";

export function definePathname(sourceField = "title") {
  return defineField({
    name: "pathname",
    title: "Pathname",
    type: "slug",
    description: "URL path for this page (e.g., /about, /blog, etc.)",
    options: {
      source: (doc) => doc[sourceField],
      maxLength: 96,
      slugify: (input: string) =>
        input
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .slice(0, 96),
    },
    validation: (Rule) => Rule.required(),
  });
}
