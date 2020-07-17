import ApolloClient, { InMemoryCache } from 'apollo-boost';
import withApollo from 'next-with-apollo';

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: process.env.API_URL ?? 'http://localhost:4000/graphql',
      cache: new InMemoryCache().restore(initialState || {}),
    })
);
