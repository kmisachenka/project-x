import ApolloClient, { InMemoryCache } from 'apollo-boost';
import withApollo from 'next-with-apollo';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: publicRuntimeConfig.apiEndpoint,
      cache: new InMemoryCache().restore(initialState || {}),
    })
);
