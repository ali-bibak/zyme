import { defineField } from "sanity";

interface DefinePathnameConfig {
  sourceField?: string;
  options?: {
    source?: (doc: any) => string;
    maxLength?: number;
    slugify?: (input: string) => string;
    [key: string]: any;
  };
}

export function definePathname(
  configOrSourceField: DefinePathnameConfig | string = "title",
) {
  let sourceField = "title";
  let userOptions = {};

  if (typeof configOrSourceField === "string") {
    sourceField = configOrSourceField;
  } else {
    sourceField = configOrSourceField.sourceField ?? "title";
    userOptions = configOrSourceField.options ?? {};
  }

  const defaultOptions = {
    source: (doc: any) => doc[sourceField],
    maxLength: 96,
    slugify: (input: string) =>
      input
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 96),
  };

  const mergedOptions = {
    ...defaultOptions,
    ...userOptions,
  };

  return defineField({
    name: "pathname",
    title: "Pathname",
    type: "slug",
    description: "URL path for this page (e.g., /about, /blog, etc.)",
    options: mergedOptions,
    validation: (Rule) => Rule.required(),
  });
}
