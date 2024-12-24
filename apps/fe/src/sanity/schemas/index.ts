import page from "./documents/page";

import { about } from "@/sanity/schemas/documents/about";
import { blogArticle } from "@/sanity/schemas/documents/blogArticle";
// Documents
import { blogAuthor } from "@/sanity/schemas/documents/blogAuthor";
import { blogTag } from "@/sanity/schemas/documents/blogTag";
import { careers } from "@/sanity/schemas/documents/career";
import { contact } from "@/sanity/schemas/documents/contact";
import { job } from "@/sanity/schemas/documents/job";
import { navigation } from "@/sanity/schemas/documents/navigation";
import { notFound } from "@/sanity/schemas/documents/notFound";
import { pageCta } from "@/sanity/schemas/documents/pageCta";
import { pageCtaDouble } from "@/sanity/schemas/documents/pageCtaDouble";
import { pageCtaTriple } from "@/sanity/schemas/documents/pageCtaTriple";
import { pricing } from "@/sanity/schemas/documents/pricing";
import { sectionHero } from "@/sanity/schemas/documents/sectionHero";

// Objects
import { admonition } from "@/sanity/schemas/objects/admonition";
import { codeSnippet } from "@/sanity/schemas/objects/codeSnippet";
import { cta } from "@/sanity/schemas/objects/cta";
import { imageBlock } from "@/sanity/schemas/objects/image";
import { link } from "@/sanity/schemas/objects/link";
import { ogImage } from "@/sanity/schemas/objects/ogImage";
import { ptBody, ptBodyCollapsible } from "@/sanity/schemas/objects/ptBody";
import { quoteBlock } from "@/sanity/schemas/objects/quoteBlock";
import { richText } from "@/sanity/schemas/objects/richText";
import { seo } from "@/sanity/schemas/objects/seo";
import { styledCta } from "@/sanity/schemas/objects/styledCta";
import { ptTable } from "@/sanity/schemas/objects/table";
import { tag } from "@/sanity/schemas/objects/tag";
import { twitterEmbed } from "@/sanity/schemas/objects/twitterEmbed";
import { youtubeVideo } from "@/sanity/schemas/objects/youtubeVideo";

// Sections
import { testimonials } from "@/sanity/schemas/sections/testimonials";

import { announcement } from "./settings/announcement";
import { banner } from "./settings/banner";
// Settings
import { redirect } from "./settings/navigation";

const schemas = [
  page,
  job,
  careers,
  about,
  contact,
  notFound,
  sectionHero,
  navigation,
  pricing,
  pageCta,
  pageCtaDouble,
  pageCtaTriple,
  blogAuthor,
  blogTag,
  blogArticle,
  cta,
  seo,
  ptBody,
  ptBodyCollapsible,
  styledCta,
  tag,
  link,
  admonition,
  ogImage,
  ptTable,
  quoteBlock,
  twitterEmbed,
  youtubeVideo,
  codeSnippet,
  imageBlock,
  richText,

  // Sections
  testimonials,

  // Settings
  redirect,
  announcement,
  banner,
];

export default schemas;
