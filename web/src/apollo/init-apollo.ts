import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { NextPageContext } from 'next';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const create = (
  initialState: NormalizedCacheObject,
  context?: NextPageContext
) => {
  const isBrowser = typeof window !== 'undefined';

  const httpLink = new HttpLink({
    headers: context?.req?.headers,
    uri: publicRuntimeConfig.apiEndpoint,
    credentials: 'include',
  });

  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Выключаем forceFetch на сервере, так что все запросы выполнятся один раз
    link: httpLink,
    cache: new InMemoryCache().restore(initialState),
  });

  return client;
};

// eslint-disable-next-line unicorn/no-null
let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export default function initApollo(
  initialState: NormalizedCacheObject = {},
  context?: NextPageContext
): ApolloClient<NormalizedCacheObject> {
  /**
   * Создаем apollo-client для каждого запроса на серверной стороне,
   * чтобы данные не были общими для разных соединений
   */
  if (typeof window === 'undefined') {
    return create(initialState, context);
  }

  // Переиспользуем apollo-client на клиентской стороне
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
