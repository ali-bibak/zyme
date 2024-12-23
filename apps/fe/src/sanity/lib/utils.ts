interface SanityDocument {
  _id: string;
  [key: string]: unknown;
}

interface SanityClient {
  fetch: <T = unknown>(
    query: string,
    params?: Record<string, unknown>,
  ) => Promise<T>;
}

interface Context {
  document: SanityDocument;
  getClient: (options: { apiVersion: string }) => SanityClient;
}

export async function isUnique(
  slug: string,
  context: Context,
): Promise<boolean> {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: "2023-06-21" });
  const id = document._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query = `*[!(_id in [$draft, $published]) && pathname.current == $slug]`;
  // biome-ignore lint: We intentionally use `any[]` here because the shape of fetched data can vary.
  const result = await client.fetch<any[]>(query, params);

  return result.length === 0;
}
