import type { Rule } from "sanity";

interface StringField {
  type: "string";
  name: string;
  validation?: (rule: Rule) => Rule;
}

interface ImageField {
  name: string;
  title: string;
  type: "image";
  description?: string;
  validation?: (rule: Rule) => Rule;
  fields?: StringField[];
}

export const logoFields: ImageField[] = [
  {
    name: "lightModeImage",
    title: "Light Mode Logo",
    type: "image",
    description: "Please use a dark logo",
    validation: (rule) => rule.required(),
    fields: [
      {
        type: "string",
        name: "alt",
        validation: (rule) => rule.required(),
      },
    ],
  },
  {
    name: "darkModeImage",
    title: "Dark Mode Logo",
    type: "image",
    description: "Please use a light logo",
    validation: (rule) => rule.required(),
    fields: [
      {
        type: "string",
        name: "alt",
        validation: (rule) => rule.required(),
      },
    ],
  },
];
