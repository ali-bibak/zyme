import { defineType } from "sanity";

export const banner = defineType({
  name: "banner",
  type: "document",
  title: "Banner",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "The title or headline for the banner.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "A short description or supporting text for the banner.",
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      description: "An image to be displayed on the banner.",
      options: {
        hotspot: true,
      },
    },
    {
      name: "link",
      type: "url",
      title: "Link",
      description: "URL to redirect users when they click the banner.",
    },
    {
      name: "position",
      type: "string",
      title: "Position",
      description:
        "The position where the banner will appear (e.g., homepage, sidebar, footer).",
      options: {
        list: ["top", "middle", "bottom", "sidebar"],
      },
    },
    {
      name: "active",
      type: "boolean",
      title: "Active",
      description: "Toggle whether the banner is currently displayed.",
      initialValue: true,
    },
    {
      name: "validFrom",
      type: "datetime",
      title: "Valid From",
      description: "The date and time when the banner should start appearing.",
    },
    {
      name: "validUntil",
      type: "datetime",
      title: "Valid Until",
      description: "The date and time when the banner should stop appearing.",
    },
  ],
});
