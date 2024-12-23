import { defineType } from "sanity";

export const announcement = defineType({
  name: "announcement",
  type: "document",
  title: "Announcement",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "The title or headline for the announcement.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "message",
      type: "text",
      title: "Message",
      description: "The main text of the announcement.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "priority",
      type: "string",
      title: "Priority",
      description: "The priority level of the announcement.",
      options: {
        list: ["info", "warning", "critical"],
      },
    },
    {
      name: "audience",
      type: "string",
      title: "Audience",
      description: "The target audience for this announcement.",
      options: {
        list: ["all", "registered users", "admins"],
      },
    },
    {
      name: "link",
      type: "url",
      title: "Link",
      description:
        "Optional link for more details or action related to the announcement.",
    },
    {
      name: "active",
      type: "boolean",
      title: "Active",
      description: "Toggle whether the announcement is currently displayed.",
      initialValue: true,
    },
    {
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      description: "The date and time when the announcement is published.",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "validUntil",
      type: "datetime",
      title: "Valid Until",
      description: "The date and time when the announcement should expire.",
    },
  ],
});
