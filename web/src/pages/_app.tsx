import { ApolloProvider } from '@apollo/react-hooks';
import { ChakraProvider } from '@chakra-ui/core';
// import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import App from 'next/app';
import React from 'react';

// import withApollo from '../hocs/with-apollo';
import withApollo, { WithApollo } from '../apollo/with-apollo';
import { appWithTranslation } from '../i18n';

class MyApp extends App<WithApollo> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(appWithTranslation(MyApp));
