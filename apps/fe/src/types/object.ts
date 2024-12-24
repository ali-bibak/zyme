import type { SanityImageObject } from "@sanity/image-url/lib/types/types";
import type { BlocksBody } from ".";
import type { CTAData, ImageWithAltFieldObject } from "./generic";

export type SanityImageWithAltField = SanityImageObject & {
  alt: string;
};

export type LogoDarkLight = {
  lightModeImage?: SanityImageWithAltField;
  darkModeImage?: SanityImageWithAltField;
};

export type PageHeroProps = {
  title: string;
  subtitle?: string;
  ctas?: (CTAData & { _key: string })[];
  logoCarousel?: {
    title: string;
    logos: (LogoDarkLight & {
      link?: string;
    })[];
  };
};
export type TextPageHeroProps = {
  title: string;
  lastUpdatedText?: string;
  tocTitle: string;
  body: BlocksBody;
};

export type PageCta = {
  title: string;
  paragraph: BlocksBody;
  cta: SanityStyledCta;
  _type: "pageCta";
};

export type PageCtaDouble = {
  title: string;
  leftSectionTitle: string;
  leftSectionParagraph: BlocksBody;
  leftSectionCta: SanityStyledCta;
  rightSectionTitle: string;
  rightSectionParagraph: BlocksBody;
  rightSectionIsNewsletter: boolean;
  rightSectionCta?: SanityStyledCta;
  privacyLink?: CTAData;
  _type: "pageCtaDouble";
};

export type PageCtaTriple = {
  title: string;
  paragraph: BlocksBody;
  splitPattern?: string;
  ctas: SanityStyledCta[];
  _type: "pageCtaTriple";
};

export type SanityStyledCta = {
  title: string;
  label: string;
  link: string;
  style: "primary" | "secondary";
};
export type MediaTab = {
  _key: string;
  tabTitle?: string;
  mediaItem: (Omit<MuxVideoBlock, "caption"> | ImageWithAltFieldObject)[];
};

export type MuxVideo = {
  _type: "mux.video";
  asset: {
    playbackId?: string;
    resolution?: string;
  };
};

export type BlogTagInCard = {
  title?: string;
  slug?: string;
};

export type BlogArticleCardData = {
  _id: string;
  _type: string;
  title?: string;
  featuredImage?: ImageWithAltFieldObject;
  publishedAt?: string;
  tags?: BlogTagInCard[];
  preamble?: string;
  body: BlocksBody;
  pathname: string;
  slug: string;
  authors?: (BlogAuthor & { _key: string })[];
};

export type BlogAuthor = {
  name: string;
  details?: string;
  image?: SanityImageWithAltField;
};

export type MuxVideoBlock = {
  hasControls?: boolean;
  loop?: boolean;
  video?: MuxVideo;
  darkVideo?: MuxVideo;
  autoPlay?: boolean;
  caption?: string;
};
export type ImageBlock = {
  image: ImageWithAltFieldObject;
  caption?: string;
};

export type TwitterEmbedBlock = {
  _type: "twitterEmbed";
  url?: string;
};

export type YoutubeVideoBlock = {
  _type: "youtubeVideo";
  caption?: string;
  youtubeUrl?: string;
};

export type CodeBlockProps = {
  language: string;
  highlightedLines?: number[];
  code: string;
  filename: string;
};

export type TableBlock = {
  _type: "ptTable";
  _key: string;
  table?: { rows: [{ cells?: string[]; _type: string; _key: string }] };
};

export type QuoteProps = {
  image?: SanityImageWithAltField;
  quote?: string;
  authorName?: string;
  authorPosition?: string;
  authorImage?: SanityImageWithAltField;
};

export type AutomationAPIListResponse = {
  name: string;
  slug: string;
  engine: string;
  author: string;
  tags: string[];
  verified: boolean;
  arguments: {
    kind: string;
    name: string;
    required: boolean;
  }[];

  updatedAt: string | null;
};

export type GlobalLabels = {
  blog: {
    relatedArticles?: string;
    backToIndex?: string;
  };
  careers: {
    relatedJobs?: string;
    backToIndex?: string;
    applyToPosition?: string;
    applyToPositionDescription?: string;
    applyToPositionCTA?: string;
  };
  zymePage: {
    ogDescription?: string;
    ctaTitle?: string;
    ctaDescription?: string;
    documentationPopup?: BlocksBody;
    documentationPopupLink: CTAData;
    runCommandPrefix?: string;
    backToIndex?: string;
    cta?: CTAData;
    runSectionTitle?: string;
    runCommandTitle?: string;
    textProjectTitle?: string;
    sourceRepoTitle?: string;
  };
};
