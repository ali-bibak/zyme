import { CodeIcon } from "@sanity/icons";

import { commonSyntaxList } from "@/sanity/lib/codeLangs";
import { defineType } from "sanity";

export function capitalize(str: string) {
  if (typeof str !== "string") {
    return str;
  }
  return str?.[0] ? `${str[0].toUpperCase()}${str.slice(1) || ""}` : "";
}

export const codeSnippet = defineType({
  name: "codeSnippet",
  title: "Code Snippet",
  type: "object",
  icon: CodeIcon,
  fields: [
    {
      name: "code",
      title: "Code",
      type: "code",
      options: {
        language: "typescript",
        languageAlternatives: commonSyntaxList,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      code: "code",
    },
    prepare({ code }) {
      return {
        title: `${code?.language ? capitalize(code.language) : "Code"} snippet`,
      };
    },
  },
});
