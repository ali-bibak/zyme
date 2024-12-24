import * as queryStore from "@sanity/react-loader";

// Types
import type {
  QueryParams,
  UseQueryOptionsDefinedInitial,
} from "@sanity/react-loader";

export const useQuery = <
  QueryResponseResult = unknown,
  QueryResponseError = unknown,
>(
  query: string,
  params?: QueryParams,
  options?: UseQueryOptionsDefinedInitial<QueryResponseResult>,
) => {
  // @ts-ignore
  const snapshot = queryStore.useQuery<QueryResponseResult, QueryResponseError>(
    query,
    params,
    options,
  );

  if (snapshot.error) {
    throw snapshot.error;
  }

  return snapshot;
};
