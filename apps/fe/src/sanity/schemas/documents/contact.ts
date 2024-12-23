import definePage from "@/sanity/helpers/definePage";
import { definePathname } from "@/sanity/helpers/definePathname";
import { EnvelopeIcon } from "@sanity/icons";

export const contact = definePage({
  type: "document",
  name: "contact",
  icon: EnvelopeIcon,
  fields: [
    {
      type: "string",
      name: "title",
      description: "The title of the page",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "string",
      name: "description",
      description: "The description shown below the title",
      validation: (Rule) => Rule.required(),
    },
    definePathname(),
    {
      type: "object",
      name: "formFields",
      description: "The labels and placeholders for the form fields",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          type: "string",
          name: "name",
          description: "The label for the name field",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "string",
          name: "namePlaceholder",
          description: "The placeholder for the name field",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "string",
          name: "email",
          description: "The label for the email field",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "string",
          name: "emailPlaceholder",
          description: "The placeholder for the email field",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "string",
          name: "company",
          description: "The label for the company field",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "string",
          name: "companyPlaceholder",
          description: "The placeholder for the company field",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "string",
          name: "message",
          description: "The label for the message field",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "string",
          name: "messagePlaceholder",
          description: "The placeholder for the message field",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "string",
          name: "privacy",
          description: "The label for the privacy policy checkbox",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "string",
          name: "privacyLabel",
          description: "The label for the privacy policy link",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "string",
          name: "privacyLink",
          description: "The privacy policy link",
          validation: (Rule) => Rule.required(),
        },
        {
          type: "string",
          name: "submit",
          description: "The label for the submit button",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
});
