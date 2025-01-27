import { env } from "@/env";
import { createClient } from "next-sanity";

const config = {
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: env.NEXT_PUBLIC_SANITY_DATASET ?? "",
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: true,
};

export const client = createClient({
  ...config,
});

export default config;
