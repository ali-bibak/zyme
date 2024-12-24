// schemas/redirect.js
import { defineType } from "sanity";

import { LinkIcon } from "@sanity/icons";

export const redirect = defineType({
  name: "redirect",
  type: "document",
  title: "Redirect",
  icon: LinkIcon,
  fields: [
    {
      name: "fromPath",
      type: "string",
      title: "From Path",
      description: "The source path that the user will be redirected from.",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https", "relative"],
        }),
    },
    {
      name: "toPath",
      type: "string",
      title: "To Path",
      description: "The destination path that the user will be redirected to.",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https", "relative"],
        }),
    },
    {
      name: "isPermanent",
      type: "boolean",
      title: "Permanent Redirect?",
      description:
        "Indicate if this is a permanent (301) or temporary (302) redirect.",
      initialValue: false,
    },
    {
      name: "active",
      type: "boolean",
      title: "Active",
      description: "Toggle whether this redirection is active.",
      initialValue: true,
    },
  ],
});
