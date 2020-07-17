import { ApolloProvider } from '@apollo/react-hooks';
import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import App from 'next/app';
import React from 'react';

import withApollo from '../hocs/with-apollo';
import { appWithTranslation } from '../i18n';
import theme from '../theme';

interface IProps {
  apollo: ApolloClient<NormalizedCacheObject>;
}

class MyApp extends App<IProps> {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={theme}>
          <ColorModeProvider>
            <CSSReset />
            <Component {...pageProps} />
          </ColorModeProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApollo(appWithTranslation(MyApp));
