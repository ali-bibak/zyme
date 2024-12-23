import definePage from "@/sanity/helpers/definePage";
import { definePathname } from "@/sanity/helpers/definePathname";
// import { defineSections } from "@/sanity/helpers/defineSection";
import { BillIcon } from "@sanity/icons";
export const pricing = definePage({
  type: "document",
  name: "pricingPage",
  icon: BillIcon,
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
  ],
  fields: [
    definePathname(),
    { type: "section.hero", name: "hero", group: "content" },
    {
      type: "array",
      name: "plans",
      title: "Plans",
      group: "content",
      validation: (Rule) => Rule.min(3).max(4).required(),
      of: [
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "title",
              title: "Title",
              description: "Required. Max chars: 80",
              validation: (Rule) => Rule.required().max(80),
            },
            {
              type: "richtext",
              name: "planDescription",
              title: "Plan Description",
              validation: (Rule) => Rule.required(),
            },
            {
              type: "string",
              name: "price",
              title: "Price",
              validation: (Rule) => Rule.required(),
            },
            {
              type: "string",
              name: "priceNotes",
              title: "Price notes (Optional)",
              description: "E.g. 'Starting from $99/month'",
            },
            {
              type: "richtext",
              name: "targetPlanDescription",
              title: "Target Plan Description",
              description: 'E.g. "For teams up to 10 developers"',
              validation: (Rule) => Rule.required(),
            },
            {
              type: "string",
              name: "featuresTitle",
              title: "Features title",
              validation: (Rule) => Rule.required(),
            },
            {
              type: "array",
              name: "features",
              title: "Features",
              of: [{ type: "string" }],
            },
            {
              type: "cta",
              name: "cta",
              title: "Call to action",
            },
          ],
          preview: {
            select: {
              title: "title",
              media: "icon",
            },
            prepare({ title }) {
              return {
                title,
              };
            },
          },
        },
      ],
    },
    // defineSections(),
    {
      type: "reference",
      group: "content",
      to: [
        { type: "pageCta" },
        { type: "pageCtaDouble" },
        { type: "pageCtaTriple" },
      ],
      name: "cta",
      title: "Page CTA (Optional)",
      description:
        "Call to action for a page. This is placed at the bottom of the page before the footer.",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Pricing",
      };
    },
  },
});
