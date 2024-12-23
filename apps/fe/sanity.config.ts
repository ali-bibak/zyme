import schemas from "@/sanity/schemas";
import { codeInput } from "@sanity/code-input";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { media, mediaAssetSource } from "sanity-plugin-media";
import { muxInput } from "sanity-plugin-mux-input";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "";
const config = defineConfig({
  projectId: projectId,
  dataset: dataset,
  title: "Zyme Blog",
  apiVersion: apiVersion,
  basePath: "/admin/blog",
  plugins: [
    structureTool(),
    codeInput(),
    media(),
    muxInput({ mp4_support: "standard" }),
  ],
  schema: { types: schemas },
  tools: (tools) => {
    return tools.map((t) => {
      if (t.title === "Media") {
        return { ...t, title: "Images" };
      }

      return t;
    });
  },
  form: {
    file: {
      assetSources: () => [mediaAssetSource],
    },
    image: {
      assetSources: () => [mediaAssetSource],
    },
  },
});

export default config;
