import { publishStatusField } from "@/sanity/shared/publishStatusField";
import { seoField } from "@/sanity/shared/seoField";
import { ComposeIcon } from "@sanity/icons";
import { definePathname } from "./definePathname";
import defineSchema, { type SchemaDefinition } from "./defineSchema";

// Utils
import { uniqBy } from "lodash";

// Types
import type { DocumentDefinition } from "sanity";

type PageDefinition = Omit<DocumentDefinition, "options"> & {
  options?: SchemaDefinition["options"] & {
    disablePublishStatus?: boolean;
    hideSeo?: boolean;
  };
};

export default function definePage(schema: PageDefinition) {
  const groups = uniqBy(
    [
      {
        name: "content",
        title: "Content",
        icon: ComposeIcon,
        default: true,
      },
      ...(schema.groups || []),
    ],
    "name",
  );

  return defineSchema({
    ...schema,
    options: {
      ...(schema.options ?? {}),
      localized: true,
    },
    groups,
    fields: [
      {
        ...definePathname({ options: { i18n: { defaultLocaleId: "en" } } }),
        readOnly: schema.options?.disableCreation,
        group: "settings",
      },
      {
        name: "internalTitle",
        title: "Internal title",
        type: "string",
        description:
          "This title is only used internally in Sanity, it won't be displayed on the website.",
        group: "settings",
        hidden: schema.options?.hideInternalTitle,
      },
      ...(schema.options?.disablePublishStatus
        ? []
        : [
            {
              ...publishStatusField,
              group: "settings",
            },
          ]),
      {
        ...seoField,
        hidden: schema.options?.hideSeo,
        group: "settings",
      },
      ...schema.fields,
    ].filter(Boolean),
    preview: {
      select: {
        title: "internalTitle",
        subtitle: "pathname.current",
      },
      ...schema.preview,
    },
  });
}
