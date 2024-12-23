import { defineType } from "sanity";

import type { ObjectDefinition, ObjectOptions } from "sanity";

interface SectionConfig {
  type: string;
  name: string;
  group: string;
}

interface ExtendedObjectOptions extends ObjectOptions {
  collapsible?: boolean;
  collapsed?: boolean;
  variants?: {
    assetUrl: string;
  }[];
}

export interface ExtendedObjectDefinition
  extends Omit<ObjectDefinition, "options"> {
  options?: ExtendedObjectOptions;
}

export function defineSections(): SectionConfig {
  return {
    type: "sectionsBody",
    name: "sections",
    group: "content",
  };
}

export function defineSection(def: ExtendedObjectDefinition) {
  return defineType(def);
}

export default defineSections;
