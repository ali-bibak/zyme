import { client } from "@/sanity/config/client";
import * as queryStore from "@sanity/react-loader";

// Queries
import {
  NOT_FOUND_DOC_QUERY,
  ROUTE_QUERY,
  buildBlogIndexQuery,
} from "./queries";

// Types
import type { BlogIndexPayload, NotFoundPayload, RoutePayload } from "@/types";
import type { QueryParams } from "sanity";

let serverClientSet = false;

function initClient() {
  const serverClient = client.withConfig({
    token: process.env.NEXT_SANITY_API_TOKEN,
    stega: {
      enabled: false,
    },
  });

  if (!serverClientSet) {
    // @ts-ignore
    queryStore.setServerClient(serverClient);
    serverClientSet = true;
  }

  const usingCdn = serverClient.config().useCdn;

  return {
    queryStore,
    usingCdn,
  };
}

interface LoadQueryParams {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number;
}

// Automatically handle draft mode
export function loadQuery<T>({
  query,
  params = {},
  tags = [],
  revalidate,
}: LoadQueryParams) {
  const { queryStore } = initClient();

  // @ts-ignore
  return queryStore.loadQuery<T>(query, params, {
    perspective: "published",
    next: {
      revalidate: revalidate ?? 120,
      tags,
    },
  });
}

export function loadNotFound(locale: string) {
  return loadQuery<NotFoundPayload | null>({
    query: NOT_FOUND_DOC_QUERY,
    params: { locale },
    tags: [`notFound:${locale}`],
  });
}

// Loader for routes
export function loadRoute(pathname: string) {
  return loadQuery<RoutePayload | null>({
    query: ROUTE_QUERY,
    params: { pathname },
    tags: [`route:en${pathname}`],
  });
}

export function loadBlogIndex({
  pageNumber,
  pathParam,
}: {
  pageNumber: number;
  pathParam?: string;
}) {
  const blogIndexDocQuery = buildBlogIndexQuery({
    infiniteLoading: true,
    pathParam,
    sortBy: "publishedAt",
    sortOrder: "desc",
    pageNumber,
    entriesPerPage: 10,
  });

  return loadQuery<BlogIndexPayload | null>({
    query: blogIndexDocQuery,
    params: { locale: "en", pathname: "/blog" },
    tags: [`blogIndex:en`],
  });
}
