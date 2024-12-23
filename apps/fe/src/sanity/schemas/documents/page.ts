import definePage from "@/sanity/helpers/definePage";
import { AddDocumentIcon } from "@sanity/icons";

export const page = definePage({
  name: "page",
  title: "Page",
  type: "document",
  icon: AddDocumentIcon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
    {
      title: "SEO & Settings",
      name: "seo",
    },
  ],
});

export default page;
