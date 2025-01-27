import AdmonitionRenderer from "@/sanity/lib/AdmonitionRenderer";

export const admonition = {
  name: "admonition",
  title: "admonition",
  type: "object",
  components: {
    annotation: AdmonitionRenderer,
  },
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Tip",
    },
    {
      name: "variant",
      title: "Variant",
      type: "string",
      initialValue: "success",
      options: {
        list: [
          { title: "Success", value: "success" },
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Error", value: "error" },
        ],
      },
    },
  ],
};
