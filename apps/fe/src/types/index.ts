import type { PortableTextBlock } from "sanity";

export type Page = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  content: PortableTextBlock[];
};

export enum PublishStatus {
  hidden = "hidden",
  public = "public",
}

export const PublishStatusOptions = [
  {
    value: PublishStatus.hidden,
    title: "Hidden (won't show up in Google, but accessible through URL)",
  },
  {
    value: PublishStatus.public,
    title: "Public",
  },
];
