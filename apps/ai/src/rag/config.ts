import { Index as UpstashIndex } from "@upstash/vector";

export const upstashClient = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
});
