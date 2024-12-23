import { defineType } from "sanity";

interface SectionConfig {
  type: string;
  name: string;
  group: string;
}

export function defineSections(): SectionConfig {
  return {
    type: "sectionsBody",
    name: "sections",
    group: "content",
  };
}

export function defineSection(
  config: Parameters<typeof defineType>[0],
): ReturnType<typeof defineType> {
  return defineType(config);
}

export default defineSections;
