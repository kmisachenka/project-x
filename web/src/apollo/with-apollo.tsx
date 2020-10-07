import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';

import initApollo from './init-apollo';

export interface WithApollo {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

const AppWithApollo = (MyApp: typeof App): typeof App =>
  class Apollo extends App {
    static async getInitialProps(context: AppContext) {
      const { Component, router } = context;

      const appProps = await MyApp.getInitialProps(context);

      // Запускаем все graphql-запросы в дереве компонентов
      // и извлекаем полученные данные
      const apollo = initApollo({}, context.ctx);
      if (typeof window === 'undefined') {
        // Импортируем `@apollo/react-ssr` динамически,
        // чтобы избежать его попадания в клиентский бандл
        const { getDataFromTree } = await import('@apollo/react-ssr');

        try {
          await getDataFromTree(
            <MyApp
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          // Предотвращаем поломку SSR из-за ошибок
          // Их можно обработать в компонентах с помощью пропа data.error
          console.error('Ошибка при запуске `getDataFromTree`', error);
        }

        // getDataFromTree не вызывает componentWillUnmount
        // поэтому побочные эффекты от вставки head должны быть очищены вручную
        Head.rewind();
      }

      // Извлекаем полученные данные из кэша apollo-client
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: AppProps & { apolloState: NormalizedCacheObject }) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <MyApp {...this.props} apolloClient={this.apolloClient} />;
    }
  };

export default AppWithApollo;
